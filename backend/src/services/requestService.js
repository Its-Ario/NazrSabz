import logger from '../logger.js';
import { throwError } from '../utils/AppError.js';
import prisma from '../utils/prisma.js';
import userService from './userService.js';

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
                status = 'pending',
                scheduledAt = null,
                priority = 'normal',
                metadata = null,
                address = null,
            } = requestData;

            const request = await this.prisma.request.create({
                data: {
                    requesterId,
                    collectorId,
                    items,
                    status,
                    scheduledAt,
                    priority,
                    metadata,
                    address,
                },
            });

            return request;
        } catch (e) {
            logger.error(`Error creating request: ${e.message}`, e);
            throw e;
        }
    }

    async getRequestById(requestId) {
        try {
            const result = await this.prisma.request.findUnique({
                where: { id: requestId },
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

    async updateStatus(requestId, status) {
        const ALLOWED_STATUSES = ['PENDING', 'COMPLETED', 'CANCELED'];
        try {
            if (!ALLOWED_STATUSES.includes(status)) {
                throwError('Invalid Status', 400, { code: 'ERR_INVALID_STATUS' });
            }

            return await this.prisma.request.update({
                where: { id: requestId },
                data: {
                    status: status,
                },
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
            const collector = await userService.getUserProfile(collectorId);

            await this.prisma.request.update({
                where: {
                    id: requestId,
                },
                data: {
                    collector: collector,
                    collectorId: collectorId,
                },
                select: {
                    requester: true,
                    collector: true,
                    status: true,
                },
            });
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
}

export default new RequestService(prisma);
