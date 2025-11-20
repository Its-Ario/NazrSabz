import { WalletService } from '../src/services/walletService.js';
import { prismaMock } from './__mocks__/prismaClient.js';

let walletService;

beforeEach(() => {
    walletService = new WalletService(prismaMock);

    prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));

    prismaMock.user.create.mockReset();
    prismaMock.wallet.create.mockReset();
    prismaMock.wallet.update.mockReset();
    prismaMock.wallet.findUnique.mockReset();
});

async function createUser(overrides = {}) {
    const fakeUser = {
        id: `u_${Date.now()}`,
        name: 'n',
        username: `u_${Date.now()}`,
        email: `e_${Date.now()}@b.com`,
        passwordHash: 'hashed_password',
        tokenVersion: 0,
        ...overrides,
    };

    prismaMock.user.create.mockResolvedValue(fakeUser);

    prismaMock.wallet.create.mockResolvedValue({
        id: `w_${Date.now()}`,
        userId: fakeUser.id,
        balance: 0,
    });

    await prismaMock.user.create({ data: fakeUser });
    await walletService.createWallet(fakeUser.id);

    return fakeUser;
}

describe('WalletService', () => {
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
    });
});
