import logger from '../logger.js';
import { throwError } from '../utils/AppError.js';
import prisma from '../utils/prisma.js';
import userService from './userService.js';

const ALLOWED_STATUSES = ['PENDING', 'COMPLETED', 'CANCELED'];

export class RequestService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }

    async createRequest(requestData) {
        try {
            const {
                requesterId,
                collectorId = null,
                items,
                status = 'PENDING',
                scheduledAt = null,
                priority = 'NORMAL', // Changed to match schema string default if needed
                metadata = null,
                address = null,
            } = requestData;

            // Execute in a transaction to ensure both creation and location update happen (or fail) together
            const result = await this.prisma.$transaction(async (tx) => {
                // 1. Create the request WITHOUT the location field
                const request = await tx.request.create({
                    data: {
                        requesterId,
                        collectorId,
                        items,
                        status,
                        scheduledAt,
                        priority,
                        metadata,
                        address,
                        // location: DO NOT include this here
                    },
                });

                // 2. If coordinates exist, update the row with Raw SQL
                // Assuming address.location.coordinates is [longitude, latitude]
                if (address && address.location && Array.isArray(address.location.coordinates)) {
                    const [lng, lat] = address.location.coordinates;

                    await tx.$executeRaw`
          UPDATE "Request"
          SET location = ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)
          WHERE id = ${request.id}
        `;
                }

                return request;
            });

            return result;
        } catch (e) {
            logger.error(`Error creating request: ${e.message}`, e);
            throw e;
        }
    }

    async getRequestById(requestId) {
        try {
            const result = await this.prisma.request.findUnique({
                where: { id: requestId },
                include: {
                    requester: { select: { id: true, name: true, phone: true } },
                    collector: { select: { id: true, name: true, phone: true } },
                },
            });

            if (!result) {
                throwError('Request not found', 404, { code: 'ERR_REQ_NOT_FOUND' });
            }

            return result;
        } catch (e) {
            logger.error('Error fetching request: ', requestId);
            throw e;
        }
    }

    async getRequestCountByStatus(status) {
        const upperStatus = status.toUpperCase();
        if (!ALLOWED_STATUSES.includes(upperStatus)) {
            throwError('Invalid Status', 400, { code: 'ERR_INVALID_STATUS' });
        }
        try {
            const result = await this.prisma.request.count({
                where: { status },
            });

            return result;
        } catch (e) {
            logger.error('Error fetching requests by status:', status);
            throw e;
        }
    }

    async getAllRequestCounts() {
        const results = await prisma.request.groupBy({
            by: ['status'],
            _count: {
                id: true,
            },
        });

        const stats = {
            PENDING: 0,
            COMPLETED: 0,
            CANCELED: 0,
        };

        results.forEach((item) => {
            stats[item.status] = item._count.id;
        });

        return stats;
    }

    async getCompletedToday() {
        const now = new Date();

        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);

        const count = await prisma.request.count({
            where: {
                status: 'COMPLETED',

                updatedAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        return count;
    }

    async updateStatus(requestId, status) {
        try {
            const upperStatus = status.toUpperCase();
            if (!ALLOWED_STATUSES.includes(upperStatus)) {
                throwError('Invalid Status', 400, { code: 'ERR_INVALID_STATUS' });
            }

            return await this.prisma.request.update({
                where: { id: requestId },
                data: { status: upperStatus },
                select: {
                    status: true,
                    requesterId: true,
                    collectorId: true,
                },
            });
        } catch (e) {
            logger.error('Error updating request status');
            throw e;
        }
    }

    async updateCollector(requestId, collectorId) {
        try {
            await userService.getUserProfile(collectorId);

            const updated = await this.prisma.request.update({
                where: { id: requestId },
                data: {
                    collectorId,
                },
                include: {
                    requester: true,
                    collector: true,
                },
                select: {
                    status: true,
                },
            });

            return updated;
        } catch (e) {
            logger.error('Error updating request collector');
            throw e;
        }
    }

    async getAllRequests({ page = 1, limit = 10 } = {}) {
        const skip = (page - 1) * limit;
        const [requests, total] = await Promise.all([
            this.prisma.request.findMany({
                skip,
                take: limit,
                include: { collector: true, requester: true },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.request.count(),
        ]);

        return {
            requests,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        };
    }

    async getRequestsByRequester(requesterId, { status = null, page = 1, limit = 10 } = {}) {
        const skip = (page - 1) * limit;
        const where = { requesterId };
        if (status) where.status = status.toUpperCase();

        const [requests, total] = await Promise.all([
            this.prisma.request.findMany({
                where,
                skip,
                take: limit,
                include: { collector: true, requester: true },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.request.count({ where }),
        ]);

        return {
            requests,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        };
    }

    async getRequestsByCollector(collectorId, { status = null, page = 1, limit = 10 } = {}) {
        const skip = (page - 1) * limit;
        const where = { collectorId };
        if (status) where.status = status.toUpperCase();

        const [requests, total] = await Promise.all([
            this.prisma.request.findMany({
                where,
                skip,
                take: limit,
                include: { collector: true, requester: true },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.request.count({ where }),
        ]);

        return {
            requests,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        };
    }

    async getRequestStats(userId, role = 'requester') {
        const where = role === 'collector' ? { collectorId: userId } : { requesterId: userId };

        const grouped = await this.prisma.request.groupBy({
            by: ['status'],
            where,
            _count: { _all: true },
        });

        const stats = {
            total: 0,
            PENDING: 0,
            COMPLETED: 0,
            CANCELED: 0,
        };

        grouped.forEach((g) => {
            const count = g._count._all;
            stats.total += count;
            const key = g.status.toUpperCase();
            if (key in stats) stats[key] = count;
        });

        return stats;
    }

    async getTotalCollectedWeight(collectorId) {
        try {
            const requests = await this.prisma.request.findMany({
                where: {
                    collectorId,
                    status: 'COMPLETED',
                },
                select: { items: true },
            });

            let totalWeight = 0;

            for (const { items } of requests) {
                if (Array.isArray(items)) {
                    items.forEach((item) => {
                        if (item && typeof item.weight === 'number') {
                            totalWeight += item.weight;
                        }
                    });
                } else if (items && typeof items === 'object') {
                    Object.values(items).forEach((value) => {
                        if (typeof value === 'number') {
                            totalWeight += value;
                        }
                    });
                }
            }

            return Number(totalWeight.toFixed(2));
        } catch (e) {
            logger.error(
                `Error calculating total weight for collector ${collectorId}: ${e.message}`
            );
            throw e;
        }
    }

    async getTotalRequestedWeight(requesterId) {
        try {
            const requests = await this.prisma.request.findMany({
                where: { requesterId },
                select: { items: true },
            });

            let totalWeight = 0;

            for (const { items } of requests) {
                if (!items || typeof items !== 'object') continue;

                const itemsArray = Array.isArray(items) ? items : Object.values(items);

                itemsArray.forEach((item) => {
                    if (item && typeof item === 'object' && 'weight' in item) {
                        const weight =
                            typeof item.weight === 'string' ? parseFloat(item.weight) : item.weight;

                        if (!isNaN(weight) && typeof weight === 'number') {
                            totalWeight += weight;
                        }
                    }
                });
            }

            return Number(totalWeight.toFixed(2));
        } catch (e) {
            logger.error(
                `Error calculating total requested weight for requester ${requesterId}: ${e.message}`
            );
            throw e;
        }
    }

    async getWeightBreakdownByMaterial(requesterId) {
        try {
            const requests = await this.prisma.request.findMany({
                where: {
                    requesterId,
                },
                select: { items: true },
            });

            const breakdown = {
                plastic: 0,
                paper: 0,
                glass: 0,
                metal: 0,
            };

            for (const { items } of requests) {
                if (!items || typeof items !== 'object') continue;

                logger.info(`Processing items: ${JSON.stringify(items)}`); // Debug log

                const itemsArray = Array.isArray(items) ? items : Object.values(items);

                itemsArray.forEach((item) => {
                    if (item && typeof item === 'object' && item.type) {
                        const weight =
                            typeof item.weight === 'string' ? parseFloat(item.weight) : item.weight;

                        if (!isNaN(weight) && typeof weight === 'number') {
                            const type = item.type.toLowerCase();
                            logger.info(`Adding ${weight} to ${type}`); // Debug log
                            if (Object.prototype.hasOwnProperty.call(breakdown, type)) {
                                breakdown[type] += weight;
                            }
                        }
                    }
                });
            }

            Object.keys(breakdown).forEach((key) => {
                breakdown[key] = Number(breakdown[key].toFixed(2));
            });

            return breakdown;
        } catch (e) {
            logger.error(
                `Error calculating weight breakdown for requester ${requesterId}: ${e.message}`
            );
            throw e;
        }
    }
}

export default new RequestService(prisma);
