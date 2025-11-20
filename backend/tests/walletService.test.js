import { WalletService } from '../src/services/walletService.js';
import { prismaMock } from './__mocks__/prismaClient.js';

let walletService;

beforeEach(() => {
    walletService = new WalletService(prismaMock);

    prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));

    if (prismaMock.user) {
        Object.keys(prismaMock.user).forEach((key) => {
            if (prismaMock.user[key]?.mockReset) {
                prismaMock.user[key].mockReset();
            }
        });
    }

    if (prismaMock.wallet) {
        Object.keys(prismaMock.wallet).forEach((key) => {
            if (prismaMock.wallet[key]?.mockReset) {
                prismaMock.wallet[key].mockReset();
            }
        });
    }
});

async function createUser(overrides = {}) {
    const fakeUser = {
        id: `u_${Date.now()}_${Math.random()}`,
        name: 'Test User',
        username: `u_${Date.now()}_${Math.random()}`,
        email: `e_${Date.now()}_${Math.random()}@test.com`,
        passwordHash: 'hashed_password',
        tokenVersion: 0,
        ...overrides,
    };

    prismaMock.user.create.mockResolvedValue(fakeUser);

    return fakeUser;
}

describe('WalletService', () => {
    describe('createWallet', () => {
        it('should create a wallet with initial balance of 0', async () => {
            const user = await createUser();
            const mockWallet = {
                id: `w_${Date.now()}`,
                userId: user.id,
                balance: 0,
            };

            prismaMock.wallet.create.mockResolvedValue(mockWallet);

            const wallet = await walletService.createWallet(user.id);

            expect(wallet).toBeDefined();
            expect(wallet.userId).toBe(user.id);
            expect(wallet.balance).toBe(0);
            expect(prismaMock.wallet.create).toHaveBeenCalledWith({
                data: {
                    userId: user.id,
                    balance: 0,
                },
            });
        });

        it('should return wallet with correct structure', async () => {
            const user = await createUser();
            const mockWallet = {
                id: `w_123`,
                userId: user.id,
                balance: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            prismaMock.wallet.create.mockResolvedValue(mockWallet);

            const wallet = await walletService.createWallet(user.id);

            expect(wallet).toHaveProperty('id');
            expect(wallet).toHaveProperty('userId');
            expect(wallet).toHaveProperty('balance');
        });

        it('should handle database errors during wallet creation', async () => {
            const user = await createUser();

            prismaMock.wallet.create.mockRejectedValue(new Error('Database error'));

            await expect(walletService.createWallet(user.id)).rejects.toThrow('Database error');
        });

        it('should handle unique constraint errors', async () => {
            const user = await createUser();
            const error = new Error('Unique constraint failed');
            error.code = 'P2002';

            prismaMock.wallet.create.mockRejectedValue(error);

            await expect(walletService.createWallet(user.id)).rejects.toThrow(
                'Unique constraint failed'
            );
        });

        it('should create wallet for different user ids', async () => {
            const user1 = await createUser();
            const user2 = await createUser({ id: 'user2' });

            const wallet1 = { id: 'w1', userId: user1.id, balance: 0 };
            const wallet2 = { id: 'w2', userId: user2.id, balance: 0 };

            prismaMock.wallet.create.mockResolvedValueOnce(wallet1).mockResolvedValueOnce(wallet2);

            const result1 = await walletService.createWallet(user1.id);
            const result2 = await walletService.createWallet(user2.id);

            expect(result1.userId).toBe(user1.id);
            expect(result2.userId).toBe(user2.id);
        });
    });

    describe('addUserFunds', () => {
        it('should correctly add funds to a user account', async () => {
            const user = await createUser();

            prismaMock.wallet.update.mockResolvedValue({
                id: `w_${Date.now()}`,
                userId: user.id,
                balance: 50,
            });

            const wallet = await walletService.addUserFunds(user.id, 50);

            expect(wallet.balance).toBe(50);
            expect(prismaMock.wallet.update).toHaveBeenCalledWith({
                where: { userId: user.id },
                data: { balance: { increment: 50 } },
            });
        });

        it('should add funds incrementally', async () => {
            const user = await createUser();

            prismaMock.wallet.update.mockResolvedValueOnce({
                id: `w_1`,
                userId: user.id,
                balance: 50,
            });

            const wallet1 = await walletService.addUserFunds(user.id, 50);
            expect(wallet1.balance).toBe(50);

            prismaMock.wallet.update.mockResolvedValueOnce({
                id: `w_1`,
                userId: user.id,
                balance: 100,
            });

            const wallet2 = await walletService.addUserFunds(user.id, 50);
            expect(wallet2.balance).toBe(100);
        });

        it('should handle decimal amounts', async () => {
            const user = await createUser();

            prismaMock.wallet.update.mockResolvedValue({
                id: `w_1`,
                userId: user.id,
                balance: 25.5,
            });

            const wallet = await walletService.addUserFunds(user.id, 25.5);

            expect(wallet.balance).toBe(25.5);
        });

        it('should throw an error if the user is not found', async () => {
            const error = new Error('Record not found');
            error.code = 'P2025';
            prismaMock.wallet.update.mockRejectedValue(error);

            const nonExistentUserId = '00000000-0000-0000-0000-000000000000';

            await expect(walletService.addUserFunds(nonExistentUserId, 50)).rejects.toThrow(
                'User not found'
            );
        });

        it('should throw error for zero amount', async () => {
            const user = await createUser();

            await expect(walletService.addUserFunds(user.id, 0)).rejects.toThrow('Invalid amount');
        });

        it('should throw error for negative amount', async () => {
            const user = await createUser();

            await expect(walletService.addUserFunds(user.id, -10)).rejects.toThrow(
                'Invalid amount'
            );
        });

        it('should throw error for negative decimal amount', async () => {
            const user = await createUser();

            await expect(walletService.addUserFunds(user.id, -0.01)).rejects.toThrow(
                'Invalid amount'
            );
        });

        it('should not call database for invalid amounts', async () => {
            const user = await createUser();

            await expect(walletService.addUserFunds(user.id, -10)).rejects.toThrow();

            expect(prismaMock.wallet.update).not.toHaveBeenCalled();
        });

        it('should handle large amounts', async () => {
            const user = await createUser();
            const largeAmount = 1000000;

            prismaMock.wallet.update.mockResolvedValue({
                id: `w_1`,
                userId: user.id,
                balance: largeAmount,
            });

            const wallet = await walletService.addUserFunds(user.id, largeAmount);

            expect(wallet.balance).toBe(largeAmount);
        });

        it('should handle database errors', async () => {
            const user = await createUser();

            prismaMock.wallet.update.mockRejectedValue(new Error('Connection timeout'));

            await expect(walletService.addUserFunds(user.id, 50)).rejects.toThrow(
                'Connection timeout'
            );
        });

        it('should use increment operation for balance update', async () => {
            const user = await createUser();

            prismaMock.wallet.update.mockResolvedValue({
                id: `w_1`,
                userId: user.id,
                balance: 75,
            });

            await walletService.addUserFunds(user.id, 75);

            expect(prismaMock.wallet.update).toHaveBeenCalledWith({
                where: { userId: user.id },
                data: { balance: { increment: 75 } },
            });
        });

        it('should handle very small decimal amounts', async () => {
            const user = await createUser();

            prismaMock.wallet.update.mockResolvedValue({
                id: `w_1`,
                userId: user.id,
                balance: 0.01,
            });

            const wallet = await walletService.addUserFunds(user.id, 0.01);

            expect(wallet.balance).toBe(0.01);
        });
    });

    describe('getWalletByUser', () => {
        it('should return wallet when found', async () => {
            const user = await createUser();
            const mockWallet = {
                id: `w_${Date.now()}`,
                userId: user.id,
                balance: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            prismaMock.wallet.findUnique.mockResolvedValue(mockWallet);

            const wallet = await walletService.getWalletByUser(user.id);

            expect(wallet).toBeDefined();
            expect(wallet.userId).toBe(user.id);
            expect(wallet.balance).toBe(100);
            expect(prismaMock.wallet.findUnique).toHaveBeenCalledWith({
                where: { userId: user.id },
            });
        });

        it('should return null when wallet not found', async () => {
            prismaMock.wallet.findUnique.mockResolvedValue(null);

            const wallet = await walletService.getWalletByUser('nonexistent');

            expect(wallet).toBeNull();
        });

        it('should handle database errors', async () => {
            const user = await createUser();

            prismaMock.wallet.findUnique.mockRejectedValue(new Error('Database error'));

            await expect(walletService.getWalletByUser(user.id)).rejects.toThrow('Database error');
        });

        it('should return wallet with zero balance', async () => {
            const user = await createUser();
            const mockWallet = {
                id: `w_1`,
                userId: user.id,
                balance: 0,
            };

            prismaMock.wallet.findUnique.mockResolvedValue(mockWallet);

            const wallet = await walletService.getWalletByUser(user.id);

            expect(wallet.balance).toBe(0);
        });

        it('should return wallet with correct structure', async () => {
            const user = await createUser();
            const mockWallet = {
                id: `w_1`,
                userId: user.id,
                balance: 250.75,
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-15'),
            };

            prismaMock.wallet.findUnique.mockResolvedValue(mockWallet);

            const wallet = await walletService.getWalletByUser(user.id);

            expect(wallet).toHaveProperty('id');
            expect(wallet).toHaveProperty('userId');
            expect(wallet).toHaveProperty('balance');
            expect(wallet).toHaveProperty('createdAt');
            expect(wallet).toHaveProperty('updatedAt');
        });

        it('should fetch different wallets for different users', async () => {
            await createUser({ id: 'user1' });
            await createUser({ id: 'user2' });

            const wallet1 = { id: 'w1', userId: 'user1', balance: 100 };
            const wallet2 = { id: 'w2', userId: 'user2', balance: 200 };

            prismaMock.wallet.findUnique
                .mockResolvedValueOnce(wallet1)
                .mockResolvedValueOnce(wallet2);

            const result1 = await walletService.getWalletByUser('user1');
            const result2 = await walletService.getWalletByUser('user2');

            expect(result1.userId).toBe('user1');
            expect(result1.balance).toBe(100);
            expect(result2.userId).toBe('user2');
            expect(result2.balance).toBe(200);
        });

        it('should handle connection timeout errors', async () => {
            const user = await createUser();
            const error = new Error('Connection timeout');

            prismaMock.wallet.findUnique.mockRejectedValue(error);

            await expect(walletService.getWalletByUser(user.id)).rejects.toThrow(
                'Connection timeout'
            );
        });

        it('should return wallet with large balance', async () => {
            const user = await createUser();
            const mockWallet = {
                id: `w_1`,
                userId: user.id,
                balance: 9999999.99,
            };

            prismaMock.wallet.findUnique.mockResolvedValue(mockWallet);

            const wallet = await walletService.getWalletByUser(user.id);

            expect(wallet.balance).toBe(9999999.99);
        });

        it('should call findUnique with correct where clause', async () => {
            const userId = 'test-user-123';

            prismaMock.wallet.findUnique.mockResolvedValue({
                id: 'w_1',
                userId,
                balance: 0,
            });

            await walletService.getWalletByUser(userId);

            expect(prismaMock.wallet.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaMock.wallet.findUnique).toHaveBeenCalledWith({
                where: { userId },
            });
        });
    });
});
