import { prismaMock } from './__mocks__/prismaClient.js';
import { UserService } from '../src/services/userService.js';

let userService;

beforeEach(() => {
    userService = new UserService(prismaMock);

    prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
});

async function createUser(overrides = {}) {
    const fakeUser = sanitizeUser({
        id: `u_${Date.now()}`,
        name: 'n',
        username: `u_${Date.now()}`,
        email: `e_${Date.now()}@b.com`,
        passwordHash: 'hashed_password',
        tokenVersion: 0,
        role: 'USER',
        ...overrides,
    });
    prismaMock.user.create.mockResolvedValue(fakeUser);
    prismaMock.user.findUnique.mockResolvedValue(fakeUser);
    prismaMock.user.findMany.mockResolvedValue([fakeUser]);
    prismaMock.user.update.mockResolvedValue({ ...fakeUser, ...overrides });

    return fakeUser;
}

function sanitizeUser(user) {
    // eslint-disable-next-line no-unused-vars
    const { passwordHash, tokenVersion, ...safeUser } = user;
    return safeUser;
}

describe('UserService', () => {
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
            const updatedUser = { ...user, role: 'ADMIN' };
            prismaMock.user.update.mockResolvedValue(updatedUser);

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
            const user1 = await createUser();
            const user2 = await createUser({
                username: `u2_${Date.now()}`,
                email: `e2_${Date.now()}@b.com`,
            });

            prismaMock.user.findMany.mockResolvedValue([user1, user2]);

            const result = await userService.getUsers();

            expect(result.length).toBe(2);

            result.forEach((u) => {
                expect(u).not.toHaveProperty('passwordHash');
                expect(u).not.toHaveProperty('tokenVersion');
            });
        });
    });
});
