import { prismaMock } from './__mocks__/prismaClient.js';
import { TransactionService } from '../src/services/transactionService.js';

let transactionService;

beforeEach(() => {
    transactionService = new TransactionService(prismaMock);

    prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
});

async function createObjects() {
    const user = {
        id: 'u1',
        username: 'user1',
        passwordHash: 'hashed',
        email: 'a@b.com',
        name: 'Test User',
    };

    const request = {
        id: 'r1',
        requesterId: user.id,
        status: 'pending',
        items: [],
        address: {},
    };

    const transaction = {
        id: 't1',
        userId: user.id,
        requestId: request.id,
        action: 'WITHDRAWL',
        amount: 20,
    };

    prismaMock.user.create.mockResolvedValue(user);
    prismaMock.request.create.mockResolvedValue(request);
    prismaMock.transaction.create.mockResolvedValue(transaction);

    prismaMock.user.findUnique.mockResolvedValue(user);
    prismaMock.request.findUnique.mockResolvedValue(request);
    prismaMock.transaction.findUnique.mockResolvedValue(transaction);

    prismaMock.transaction.findMany.mockResolvedValue([transaction, transaction]);
    prismaMock.transaction.count.mockResolvedValue(2);

    return { user, request, transaction };
}

describe('TransactionService', () => {
    describe('createTransaction', () => {
        it('should create a transaction successfully', async () => {
            const { user, request } = await createObjects();

            const data = {
                userId: user.id,
                requestId: request.id,
                action: 'WITHDRAWL',
                amount: 20,
            };

            const result = await transactionService.createTransaction(data);

            expect(result.userId).toBe(user.id);
            expect(result.requestId).toBe(request.id);
            expect(result.amount).toBe(20);
        });

        it('should throw if user not found', async () => {
            const { request } = await createObjects();

            prismaMock.user.findUnique.mockResolvedValue(null);
            prismaMock.transaction.create.mockImplementation(() => {
                throw new Error('Should not be called');
            });

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

            prismaMock.request.findUnique.mockResolvedValue(null);

            const data = {
                userId: user.id,
                requestId: 'nonexistent',
                action: 'ADDITION',
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
