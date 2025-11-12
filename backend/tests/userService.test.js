import userService from '../src/services/userService';
import prisma from '../src/utils/prisma.js';

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

describe('userService', () => {
    describe('getUserProfile', () => {
        it('should return a user profile by ID', async () => {
            const user = await createUser();
            const result = await userService.getUserProfile(user.id);

            expect(result.id).toBe(user.id);
            expect(result.name).toBe(user.name);
            expect(result).not.toHaveProperty('passwordHash');
        });
    });

    describe('updateRole', () => {
        let user;

        beforeEach(async () => {
            user = await createUser();
        });

        it('should update the user role successfully', async () => {
            const result = await userService.updateRole(user.id, 'ADMIN');
            expect(result.role).toBe('ADMIN');
        });

        it('should throw an error for an invalid role', async () => {
            await expect(userService.updateRole(user.id, 'INVALID_ROLE')).rejects.toThrow(
                'Invalid role. Must be one of: ADMIN, MANAGER, DRIVER, USER'
            );
        });
    });

    describe('getUsers', () => {
        it('should return a list of users', async () => {
            await createUser();
            await createUser({
                username: `u2_${Date.now()}`,
                email: `e2_${Date.now()}@b.com`,
            });

            const result = await userService.getUsers();

            expect(result.length).toBe(2);

            result.forEach((u) => {
                expect(u).not.toHaveProperty('passwordHash');
                expect(u).not.toHaveProperty('tokenVersion');
            });
        });
    });
});
