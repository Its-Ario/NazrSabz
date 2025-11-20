import { prismaMock } from './__mocks__/prismaClient.js';
import { TransactionService } from '../src/services/transactionService.js';

let transactionService;

beforeEach(() => {
    transactionService = new TransactionService(prismaMock);

    if (prismaMock.user) {
        Object.keys(prismaMock.user).forEach((key) => {
            if (prismaMock.user[key]?.mockReset) {
                prismaMock.user[key].mockReset();
            }
        });
    }

    if (prismaMock.request) {
        Object.keys(prismaMock.request).forEach((key) => {
            if (prismaMock.request[key]?.mockReset) {
                prismaMock.request[key].mockReset();
            }
        });
    }

    if (prismaMock.transaction) {
        Object.keys(prismaMock.transaction).forEach((key) => {
            if (prismaMock.transaction[key]?.mockReset) {
                prismaMock.transaction[key].mockReset();
            }
        });
    }

    prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
});

async function createObjects() {
    const user = {
        id: 'u1',
        username: 'user1',
        passwordHash: 'hashed',
        email: 'a@b.com',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const request = {
        id: 'r1',
        requesterId: user.id,
        status: 'pending',
        items: [],
        address: {},
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const transaction = {
        id: 't1',
        userId: user.id,
        requestId: request.id,
        action: 'WITHDRAWL',
        amount: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    return { user, request, transaction };
}

describe('TransactionService', () => {
    describe('createTransaction', () => {
        it('should create a transaction successfully', async () => {
            const { user, request, transaction } = await createObjects();

            prismaMock.user.findUnique.mockResolvedValue(user);
            prismaMock.request.findUnique.mockResolvedValue(request);
            prismaMock.transaction.create.mockResolvedValue(transaction);

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
            expect(prismaMock.transaction.create).toHaveBeenCalledWith({
                data: {
                    userId: user.id,
                    requestId: request.id,
                    action: 'WITHDRAWL',
                    amount: 20,
                },
            });
        });

        it('should create ADDITION transaction successfully', async () => {
            const { user, request } = await createObjects();
            const transaction = {
                id: 't2',
                userId: user.id,
                requestId: request.id,
                action: 'ADDITION',
                amount: 50,
            };

            prismaMock.user.findUnique.mockResolvedValue(user);
            prismaMock.request.findUnique.mockResolvedValue(request);
            prismaMock.transaction.create.mockResolvedValue(transaction);

            const data = {
                userId: user.id,
                requestId: request.id,
                action: 'ADDITION',
                amount: 50,
            };

            const result = await transactionService.createTransaction(data);

            expect(result.action).toBe('ADDITION');
            expect(result.amount).toBe(50);
            expect(prismaMock.request.findUnique).toHaveBeenCalledWith({
                where: { id: request.id },
            });
        });

        it('should create WITHDRAWL transaction without validating request', async () => {
            const { user } = await createObjects();
            const transaction = {
                id: 't3',
                userId: user.id,
                requestId: null,
                action: 'WITHDRAWL',
                amount: 30,
            };

            prismaMock.user.findUnique.mockResolvedValue(user);
            prismaMock.transaction.create.mockResolvedValue(transaction);

            const data = {
                userId: user.id,
                requestId: null,
                action: 'WITHDRAWL',
                amount: 30,
            };

            const result = await transactionService.createTransaction(data);

            expect(result.action).toBe('WITHDRAWL');
            expect(prismaMock.request.findUnique).not.toHaveBeenCalled();
        });

        it('should throw if user not found', async () => {
            const { request } = await createObjects();

            prismaMock.user.findUnique.mockResolvedValue(null);

            const data = {
                userId: 'nonexistent',
                requestId: request.id,
                action: 'WITHDRAWL',
                amount: 20,
            };

            await expect(transactionService.createTransaction(data)).rejects.toThrow(
                'User not found'
            );
            expect(prismaMock.transaction.create).not.toHaveBeenCalled();
        });

        it('should throw if request not found for ADDITION action', async () => {
            const { user } = await createObjects();

            prismaMock.user.findUnique.mockResolvedValue(user);
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
            expect(prismaMock.transaction.create).not.toHaveBeenCalled();
        });

        it('should throw error for invalid action', async () => {
            const { user, request } = await createObjects();

            const data = {
                userId: user.id,
                requestId: request.id,
                action: 'INVALID_ACTION',
                amount: 20,
            };

            await expect(transactionService.createTransaction(data)).rejects.toThrow(
                'Invalid action'
            );
            expect(prismaMock.user.findUnique).not.toHaveBeenCalled();
            expect(prismaMock.transaction.create).not.toHaveBeenCalled();
        });

        it('should throw error for empty action', async () => {
            const { user, request } = await createObjects();

            const data = {
                userId: user.id,
                requestId: request.id,
                action: '',
                amount: 20,
            };

            await expect(transactionService.createTransaction(data)).rejects.toThrow(
                'Invalid action'
            );
        });

        it('should throw error for lowercase action', async () => {
            const { user, request } = await createObjects();

            const data = {
                userId: user.id,
                requestId: request.id,
                action: 'withdrawl',
                amount: 20,
            };

            await expect(transactionService.createTransaction(data)).rejects.toThrow(
                'Invalid action'
            );
        });

        it('should handle database errors during creation', async () => {
            const { user, request } = await createObjects();

            prismaMock.user.findUnique.mockResolvedValue(user);
            prismaMock.request.findUnique.mockResolvedValue(request);
            prismaMock.transaction.create.mockRejectedValue(new Error('Database error'));

            const data = {
                userId: user.id,
                requestId: request.id,
                action: 'ADDITION',
                amount: 20,
            };

            await expect(transactionService.createTransaction(data)).rejects.toThrow(
                'Database error'
            );
        });

        it('should handle decimal amounts', async () => {
            const { user, request } = await createObjects();
            const transaction = {
                id: 't4',
                userId: user.id,
                requestId: request.id,
                action: 'WITHDRAWL',
                amount: 25.5,
            };

            prismaMock.user.findUnique.mockResolvedValue(user);
            prismaMock.transaction.create.mockResolvedValue(transaction);

            const data = {
                userId: user.id,
                requestId: request.id,
                action: 'WITHDRAWL',
                amount: 25.5,
            };

            const result = await transactionService.createTransaction(data);

            expect(result.amount).toBe(25.5);
        });

        it('should handle large amounts', async () => {
            const { user } = await createObjects();
            const largeAmount = 1000000;
            const transaction = {
                id: 't5',
                userId: user.id,
                requestId: null,
                action: 'WITHDRAWL',
                amount: largeAmount,
            };

            prismaMock.user.findUnique.mockResolvedValue(user);
            prismaMock.transaction.create.mockResolvedValue(transaction);

            const data = {
                userId: user.id,
                requestId: null,
                action: 'WITHDRAWL',
                amount: largeAmount,
            };

            const result = await transactionService.createTransaction(data);

            expect(result.amount).toBe(largeAmount);
        });

        it('should validate user before request', async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            const data = {
                userId: 'nonexistent',
                requestId: 'some-request',
                action: 'ADDITION',
                amount: 20,
            };

            await expect(transactionService.createTransaction(data)).rejects.toThrow(
                'User not found'
            );

            expect(prismaMock.request.findUnique).not.toHaveBeenCalled();
        });
    });

    describe('getTransactionById', () => {
        it('should return transaction by ID with includes', async () => {
            const { user, request, transaction } = await createObjects();

            const fullTransaction = {
                ...transaction,
                user,
                request,
            };

            prismaMock.transaction.findUnique.mockResolvedValue(fullTransaction);

            const result = await transactionService.getTransactionById(transaction.id);

            expect(result.id).toBe(transaction.id);
            expect(result.userId).toBe(transaction.userId);
            expect(result.requestId).toBe(transaction.requestId);
            expect(result.user).toBeDefined();
            expect(result.user.id).toBe(user.id);
            expect(result.request).toBeDefined();
            expect(result.request.id).toBe(request.id);
            expect(prismaMock.transaction.findUnique).toHaveBeenCalledWith({
                where: { id: transaction.id },
                include: {
                    user: true,
                    request: true,
                },
            });
        });

        it('should throw error when transaction not found', async () => {
            prismaMock.transaction.findUnique.mockResolvedValue(null);

            await expect(transactionService.getTransactionById('nonexistent')).rejects.toThrow(
                'Transaction not found'
            );
        });

        it('should handle database errors', async () => {
            prismaMock.transaction.findUnique.mockRejectedValue(new Error('Database error'));

            await expect(transactionService.getTransactionById('t1')).rejects.toThrow(
                'Database error'
            );
        });

        it('should include user details in response', async () => {
            const { user, request, transaction } = await createObjects();

            const fullTransaction = {
                ...transaction,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                },
                request,
            };

            prismaMock.transaction.findUnique.mockResolvedValue(fullTransaction);

            const result = await transactionService.getTransactionById(transaction.id);

            expect(result.user.name).toBe(user.name);
            expect(result.user.email).toBe(user.email);
            expect(result.user.username).toBe(user.username);
        });

        it('should include request details in response', async () => {
            const { user, request, transaction } = await createObjects();

            const fullTransaction = {
                ...transaction,
                user,
                request: {
                    id: request.id,
                    requesterId: request.requesterId,
                    status: request.status,
                    items: request.items,
                },
            };

            prismaMock.transaction.findUnique.mockResolvedValue(fullTransaction);

            const result = await transactionService.getTransactionById(transaction.id);

            expect(result.request.status).toBe(request.status);
            expect(result.request.requesterId).toBe(request.requesterId);
        });

        it('should handle transaction without request', async () => {
            const { user, transaction } = await createObjects();

            const fullTransaction = {
                ...transaction,
                requestId: null,
                user,
                request: null,
            };

            prismaMock.transaction.findUnique.mockResolvedValue(fullTransaction);

            const result = await transactionService.getTransactionById(transaction.id);

            expect(result.request).toBeNull();
            expect(result.user).toBeDefined();
        });

        it('should handle connection timeout errors', async () => {
            prismaMock.transaction.findUnique.mockRejectedValue(new Error('Connection timeout'));

            await expect(transactionService.getTransactionById('t1')).rejects.toThrow(
                'Connection timeout'
            );
        });
    });

    describe('getAllTransactions', () => {
        it('should return paginated transactions', async () => {
            const { user, request } = await createObjects();

            const transactions = [
                {
                    id: 't1',
                    userId: user.id,
                    requestId: request.id,
                    action: 'WITHDRAWL',
                    amount: 20,
                    user,
                    request,
                },
                {
                    id: 't2',
                    userId: user.id,
                    requestId: request.id,
                    action: 'ADDITION',
                    amount: 50,
                    user,
                    request,
                },
            ];

            prismaMock.transaction.findMany.mockResolvedValue(transactions);
            prismaMock.transaction.count.mockResolvedValue(2);

            const result = await transactionService.getAllTransactions({ page: 1, limit: 10 });

            expect(result.transactions.length).toBe(2);
            expect(result.pagination.total).toBe(2);
            expect(result.pagination.page).toBe(1);
            expect(result.pagination.limit).toBe(10);
            expect(result.pagination.pages).toBe(1);
            expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
                skip: 0,
                take: 10,
                include: { user: true, request: true },
                orderBy: { createdAt: 'desc' },
            });
        });

        it('should handle page 2 correctly', async () => {
            prismaMock.transaction.findMany.mockResolvedValue([]);
            prismaMock.transaction.count.mockResolvedValue(25);

            const result = await transactionService.getAllTransactions({ page: 2, limit: 10 });

            expect(prismaMock.transaction.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    skip: 10,
                    take: 10,
                })
            );
            expect(result.pagination.pages).toBe(3);
        });

        it('should use default pagination values', async () => {
            prismaMock.transaction.findMany.mockResolvedValue([]);
            prismaMock.transaction.count.mockResolvedValue(0);

            const result = await transactionService.getAllTransactions();

            expect(result.pagination).toEqual({
                page: 1,
                limit: 10,
                total: 0,
                pages: 0,
            });
            expect(prismaMock.transaction.findMany).toHaveBeenCalledWith({
                skip: 0,
                take: 10,
                include: { user: true, request: true },
                orderBy: { createdAt: 'desc' },
            });
        });

        it('should handle empty results', async () => {
            prismaMock.transaction.findMany.mockResolvedValue([]);
            prismaMock.transaction.count.mockResolvedValue(0);

            const result = await transactionService.getAllTransactions({ page: 1, limit: 10 });

            expect(result.transactions).toEqual([]);
            expect(result.pagination.total).toBe(0);
            expect(result.pagination.pages).toBe(0);
        });

        it('should handle custom limit', async () => {
            prismaMock.transaction.findMany.mockResolvedValue([]);
            prismaMock.transaction.count.mockResolvedValue(0);

            await transactionService.getAllTransactions({ page: 1, limit: 5 });

            expect(prismaMock.transaction.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    take: 5,
                })
            );
        });

        it('should calculate pages correctly', async () => {
            prismaMock.transaction.findMany.mockResolvedValue([]);
            prismaMock.transaction.count.mockResolvedValue(15);

            const result = await transactionService.getAllTransactions({ page: 1, limit: 10 });

            expect(result.pagination.pages).toBe(2);
        });

        it('should order by createdAt descending', async () => {
            prismaMock.transaction.findMany.mockResolvedValue([]);
            prismaMock.transaction.count.mockResolvedValue(0);

            await transactionService.getAllTransactions();

            expect(prismaMock.transaction.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    orderBy: { createdAt: 'desc' },
                })
            );
        });

        it('should include user and request in results', async () => {
            const { user, request } = await createObjects();

            const transactions = [
                {
                    id: 't1',
                    userId: user.id,
                    requestId: request.id,
                    action: 'WITHDRAWL',
                    amount: 20,
                    user,
                    request,
                },
            ];

            prismaMock.transaction.findMany.mockResolvedValue(transactions);
            prismaMock.transaction.count.mockResolvedValue(1);

            const result = await transactionService.getAllTransactions();

            expect(result.transactions[0].user).toBeDefined();
            expect(result.transactions[0].request).toBeDefined();
        });

        it('should handle database errors', async () => {
            prismaMock.transaction.findMany.mockRejectedValue(new Error('Database error'));

            await expect(transactionService.getAllTransactions()).rejects.toThrow('Database error');
        });

        it('should handle count errors', async () => {
            prismaMock.transaction.findMany.mockResolvedValue([]);
            prismaMock.transaction.count.mockRejectedValue(new Error('Count failed'));

            await expect(transactionService.getAllTransactions()).rejects.toThrow('Count failed');
        });

        it('should handle large datasets', async () => {
            prismaMock.transaction.findMany.mockResolvedValue([]);
            prismaMock.transaction.count.mockResolvedValue(1000);

            const result = await transactionService.getAllTransactions({ page: 50, limit: 10 });

            expect(result.pagination.pages).toBe(100);
            expect(prismaMock.transaction.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    skip: 490,
                    take: 10,
                })
            );
        });

        it('should handle page 1 of multiple pages', async () => {
            prismaMock.transaction.findMany.mockResolvedValue([]);
            prismaMock.transaction.count.mockResolvedValue(100);

            const result = await transactionService.getAllTransactions({ page: 1, limit: 10 });

            expect(result.pagination.page).toBe(1);
            expect(result.pagination.pages).toBe(10);
        });

        it('should include all transaction properties', async () => {
            const { user, request } = await createObjects();

            const transaction = {
                id: 't1',
                userId: user.id,
                requestId: request.id,
                action: 'ADDITION',
                amount: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
                user,
                request,
            };

            prismaMock.transaction.findMany.mockResolvedValue([transaction]);
            prismaMock.transaction.count.mockResolvedValue(1);

            const result = await transactionService.getAllTransactions();

            const tx = result.transactions[0];
            expect(tx).toHaveProperty('id');
            expect(tx).toHaveProperty('userId');
            expect(tx).toHaveProperty('requestId');
            expect(tx).toHaveProperty('action');
            expect(tx).toHaveProperty('amount');
            expect(tx).toHaveProperty('createdAt');
            expect(tx).toHaveProperty('user');
            expect(tx).toHaveProperty('request');
        });
    });
});
