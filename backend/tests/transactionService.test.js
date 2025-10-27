import transactionService from '../src/services/transactionService.js';
import prisma from '../src/utils/prisma.js';

async function createObjects() {
    const user = await prisma.user.create({
        data: {
            username: `u${Date.now()}`,
            passwordHash: '1',
            email: `a${Date.now()}@b.com`,
            name: 'Test User',
        },
    });

    const request = await prisma.request.create({
        data: { requesterId: user.id, status: 'pending', items: [], address: {} },
    });

    const transaction = await prisma.transaction.create({
        data: { userId: user.id, requestId: request.id, action: 'WITHDRAWL', amount: 20 },
    });

    return { user, request, transaction };
}

describe('transactionService', () => {
    describe('createTransaction', () => {
        it('should create a transaction successfully', async () => {
            const { user, request } = await createObjects();
            const data = {
                userId: user.id,
                requestId: request.id,
                action: 'WITHDRAWL',
                amount: 20,
            };

            const transaction = await transactionService.createTransaction(data);

            expect(transaction.userId).toBe(user.id);
            expect(transaction.requestId).toBe(request.id);
            expect(transaction.amount).toBe(20);
        });

        it('should throw if user not found', async () => {
            const { request } = await createObjects();
            await prisma.transaction.deleteMany({});
            await prisma.request.deleteMany({});
            await prisma.user.deleteMany({});
            const data = {
                userId: 'nonexistent',
                requestId: request.id,
                action: 'WITHDRAWL',
                amount: 20,
            };

            await expect(transactionService.createTransaction(data)).rejects.toThrow(
                'User not found'
            );
        });

        it('should throw if request not found', async () => {
            const { user } = await createObjects();
            await prisma.transaction.deleteMany({});
            await prisma.request.deleteMany({});
            const data = {
                userId: user.id,
                requestId: 'nonexistent',
                action: 'WITHDRAWL',
                amount: 20,
            };

            await expect(transactionService.createTransaction(data)).rejects.toThrow(
                'Request not found'
            );
        });
    });

    describe('getTransactionById', () => {
        it('should return transaction by ID', async () => {
            const { transaction } = await createObjects();
            const result = await transactionService.getTransactionById(transaction.id);

            expect(result.id).toBe(transaction.id);
            expect(result.userId).toBe(transaction.userId);
            expect(result.requestId).toBe(transaction.requestId);
        });
    });

    describe('getAllTransactions', () => {
        it('should return paginated transactions', async () => {
            await createObjects();
            await createObjects();

            const result = await transactionService.getAllTransactions({ page: 1, limit: 10 });
            expect(result.transactions.length).toBeGreaterThanOrEqual(2);
            expect(result.pagination.total).toBeGreaterThanOrEqual(2);
        });
    });
});
