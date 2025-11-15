import prisma from '../utils/prisma.js';
import logger from '../logger.js';
import { throwError } from '../utils/AppError.js';

export class TransactionService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }

    async createTransaction({ userId, requestId, action, amount }) {
        const validActions = ['WITHDRAWL', 'ADDITION'];
        if (!validActions.includes(action)) {
            throwError('Invalid action', 400, { code: 'ERR_INVALID_ACTION' });
        }

        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throwError('User not found', 404, { code: 'ERR_USER_NOT_FOUND' });

        let request = null;
        if (action === 'ADDITION') {
            request = await this.prisma.request.findUnique({ where: { id: requestId } });
            if (!request) throwError('Request not found', 404, { code: 'ERR_REQ_NOT_FOUND' });
        }

        const transaction = await this.prisma.transaction.create({
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
        const transaction = await this.prisma.transaction.findUnique({
            where: { id },
            include: {
                user: true,
                request: true,
            },
        });

        if (!transaction)
            throwError('Transaction not found', 404, { code: 'ERR_TRANSACTION_NOT_FOUND' });
        return transaction;
    }

    async getAllTransactions({ page = 1, limit = 10 } = {}) {
        const skip = (page - 1) * limit;
        const [transactions, total] = await Promise.all([
            this.prisma.transaction.findMany({
                skip,
                take: limit,
                include: { user: true, request: true },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.transaction.count(),
        ]);

        return {
            transactions,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        };
    }
}

export default new TransactionService(prisma);
