import prisma from '../src/utils/prisma.js';
import authService from '../src/services/authService.js';
import walletService from '../src/services/walletService.js';

async function createUser(overrides = {}) {
    const defaultData = {
        name: 'n',
        username: `u_${Date.now()}`,
        email: `e_${Date.now()}@b.com`,
        passwordHash: 'hashed_password',
        tokenVersion: 0,
    };

    return prisma.user.create({
        data: { ...defaultData, ...overrides },
    });
}

describe('authService', () => {
    describe('registerUser', () => {
        const userData = {
            name: 'n',
            username: 'u_test',
            password: 'p',
            email: 'a@b.com',
        };

        it('should create and save a new user successfully', async () => {
            const result = await authService.registerUser(userData);

            expect(result).not.toHaveProperty('passwordHash');
            expect(result.username).toBe(userData.username);

            const wallet = await walletService.getWalletByUser(result.id);
            expect(wallet).toBeDefined();
            expect(wallet.balance).toBe(0);
        });

        it('should throw an error if the user already exists', async () => {
            await createUser({ email: userData.email, username: userData.username });

            await expect(authService.registerUser(userData)).rejects.toThrow(
                'User with this email or username already exists.'
            );
        });
    });

    describe('updateTokenVersion', () => {
        it('should increment tokenVersion for a user', async () => {
            const user = await createUser({ tokenVersion: 0 });

            const updatedUser = await authService.updateTokenVersion(user.id);

            expect(updatedUser.tokenVersion).toBe(1);
        });

        it('should throw an error if the user is not found', async () => {
            const nonExistentUserId = '00000000-0000-0000-0000-000000000000';

            await expect(authService.updateTokenVersion(nonExistentUserId)).rejects.toThrow(
                'User not found'
            );
        });
    });
});
