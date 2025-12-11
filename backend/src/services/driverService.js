import logger from '../logger.js';
import prisma from '../utils/prisma.js';
import { throwError } from '../utils/AppError.js';

export class DriverService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }

    async getDriverProfile(driverId) {
        const driver = await this.prisma.user.findUnique({
            where: { id: driverId },
            select: {
                id: true,
                name: true,
                vehicleModel: true,
                rating: true,
                driverStatus: true,
            },
        });

        if (!driver) {
            throwError('Driver not found', 404, { code: 'ERR_DRIVER_NOT_FOUND' });
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const todayStats = await this.prisma.request.aggregate({
            where: {
                collectorId: driverId,
                status: 'COMPLETED',
                updatedAt: { gte: startOfDay },
            },
            _count: { id: true },
        });

        const totalStats = await this.prisma.request.aggregate({
            where: { collectorId: driverId, status: 'COMPLETED' },
            _count: { id: true },
        });

        return {
            user: {
                name: driver.name,
                avatar: null,
            },
            vehicle: { model: driver.vehicleModel || 'Unknown' },
            rating: driver.rating,
            status: driver.driverStatus,
            stats: {
                todayCount: todayStats._count.id,
                totalCount: totalStats._count.id,
                weekWeight: 0,
                distance: 0,
            },
        };
    }

    async getNearbyRequests(driverId, lat, lng) {
        if (!lat || !lng) {
            throwError('Latitude and Longitude are required', 400, {
                code: 'ERR_INVALID_COORDS',
            });
        }

        try {
            await this.prisma.$executeRaw`
            UPDATE "User"
            SET location = ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)
            WHERE id = ${driverId}
        `;
            const nearbyRaw = await this.prisma.$queryRaw`
            SELECT 
                id, 
                items, 
                address, 
                status,
                "collectorId",
                ROUND((ST_Distance(
                    location::geography, 
                    ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography
                ) / 1000)::numeric, 1) as distance_km
            FROM "Request"
            WHERE 
                status::text = 'PENDING'
                AND "collectorId" IS NULL
                AND location IS NOT NULL
                AND ST_DWithin(
                    location::geography,
                    ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)::geography,
                    5000
                )
            ORDER BY distance_km ASC
        `;

            const activeRoutes = await this.prisma.request.findMany({
                where: {
                    collectorId: driverId,
                    status: 'PENDING',
                },
            });

            return { nearbyRaw, activeRoutes };
        } catch (error) {
            console.error('SQL Error:', error);
            logger.error(`Failed to fetch nearby requests: ${error.message}`, error);
            throwError('Failed to process location data', 500, {
                code: 'ERR_LOCATION_PROCESSING',
            });
        }
    }

    async updateStatus(driverId, status) {
        try {
            logger.info(`Updating driver status: ${driverId} -> ${status}`);

            await this.prisma.user.update({
                where: { id: driverId },
                data: { driverStatus: status },
            });
            return true;
        } catch (error) {
            logger.error(`Failed to update status: ${error.message}`, error);
            throwError('Failed to update status', 500, { code: 'ERR_STATUS_UPDATE' });
        }
    }

    async acceptRequest(driverId, requestId) {
        return this.prisma.$transaction(async (tx) => {
            const request = await tx.request.findUnique({ where: { id: requestId } });

            if (!request) {
                throwError('Request not found', 404, { code: 'ERR_REQUEST_NOT_FOUND' });
            }

            if (request.collectorId) {
                throwError('Request already taken', 409, { code: 'ERR_REQUEST_TAKEN' });
            }

            const updatedRequest = await tx.request.update({
                where: { id: requestId },
                data: { collectorId: driverId },
            });

            logger.info(`Driver ${driverId} accepted request ${requestId}`);
            return updatedRequest;
        });
    }

    async completeRequest(driverId, requestId) {
        try {
            const request = await this.prisma.request.findFirst({
                where: { id: requestId, collectorId: driverId },
            });

            if (!request) {
                throwError('Request not found or not assigned to you', 403, {
                    code: 'ERR_UNAUTHORIZED_ACTION',
                });
            }

            await this.prisma.request.update({
                where: { id: requestId },
                data: {
                    status: 'COMPLETED',
                    completedAt: new Date(),
                },
            });

            logger.info(`Request ${requestId} completed by ${driverId}`);
            return true;
        } catch (error) {
            if (error.statusCode) throw error;
            logger.error(`Failed to complete request: ${error.message}`, error);
            throwError('Failed to complete request', 500, { code: 'ERR_COMPLETION_FAILED' });
        }
    }
}

export default new DriverService(prisma);
