import prisma from '../utils/prisma.js';
import logger from '../logger.js';

class TransactionService {
    async createTransaction({ userId, requestId, action, amount }) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error('User not found');

        let request = null;
        if (requestId) {
            request = await prisma.request.findUnique({ where: { id: requestId } });
            if (!request) throw new Error('Request not found');
        }

        const transaction = await prisma.transaction.create({
            data: {
                userId,
                requestId,
                action,
                amount,
            },
        });

        logger.info(`Transaction created: ${transaction.id}`);
        return transaction;
    }

    async getTransactionById(id) {
        const transaction = await prisma.transaction.findUnique({
            where: { id },
            include: {
                user: true,
                request: true,
            },
        });

        if (!transaction) throw new Error('Transaction not found');
        return transaction;
    }

    async getAllTransactions({ page = 1, limit = 10 } = {}) {
        const skip = (page - 1) * limit;
        const [transactions, total] = await Promise.all([
            prisma.transaction.findMany({
                skip,
                take: limit,
                include: { user: true, request: true },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.transaction.count(),
        ]);

        return {
            transactions,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        };
    }
}

export default new TransactionService();
