import logger from '../logger.js';
import prisma from '../utils/prisma.js';
import userService from './userService.js';

class RequestService {
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

            const request = await prisma.request.create({
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
            return await prisma.request.findUnique({
                where: { id: requestId },
            });
        } catch (e) {
            logger.error('Error fetching request: ', requestId);
            throw e;
        }
    }

    async updateStatus(requestId, status) {
        const ALLOWED_STATUSES = ["PENDING", "COMPLETED", "CANCELED"];
        try {
            if(!ALLOWED_STATUSES.includes(status)) {
                return {ok: false, message: "Invalid status"}
            }

            return await prisma.request.update({
                where: { id: requestId },
                data: {
                    status: status,
                },
                select: {
                    status: true,
                    requesterId: true,
                    collectorId: true
                }
            });
        } catch (e) {
            logger.error('Error updating request status');
            throw e;
        }
    }

    async updateCollector(requestId, collectorId) {
        try {
            const collector = await userService.getUserProfile(collectorId);

            await prisma.request.update({
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
}

export default new RequestService();
