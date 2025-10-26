import logger from '../logger.js';
import prisma from '../utils/prisma.js';

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
        return prisma.request.findUnique({
            where: { id: requestId },
            include: {
                requester: true,
                collector: true,
            },
        });
    }
}

export default new RequestService();
