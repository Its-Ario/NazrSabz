import prisma from '../src/utils/prisma.js';
import walletService from '../src/services/walletService.js';

async function createUser(overrides = {}) {
    const user = await prisma.user.create({
        data: {
            name: 'n',
            username: `u_${Date.now()}`,
            email: `e_${Date.now()}@b.com`,
            passwordHash: 'hashed_password',
            tokenVersion: 0,
            ...overrides,
        },
    });

    await walletService.createWallet(user.id);

    return user;
}

describe('WalletService', () => {
    describe('addUserFunds', () => {
        it('should correctly add funds to a user account', async () => {
            const user = await createUser();

            const wallet = await walletService.addUserFunds(user.id, 50);

            expect(wallet.balance).toBe(50);
        });

        it('should throw an error if the user is not found', async () => {
            const nonExistentUserId = '00000000-0000-0000-0000-000000000000';

            await expect(walletService.addUserFunds(nonExistentUserId, 50)).rejects.toThrow(
                'User not found'
            );
        });
    });
});
