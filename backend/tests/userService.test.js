import { prismaMock } from './__mocks__/prismaClient.js';
import { UserService } from '../src/services/userService.js';

let userService;

beforeEach(() => {
    userService = new UserService(prismaMock);

    if (prismaMock.user) {
        Object.keys(prismaMock.user).forEach((key) => {
            if (prismaMock.user[key]?.mockReset) {
                prismaMock.user[key].mockReset();
            }
        });
    }

    prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));
});

async function createUser(overrides = {}) {
    const fakeUser = {
        id: `u_${Date.now()}_${Math.random()}`,
        name: 'Test User',
        username: `u_${Date.now()}_${Math.random()}`,
        email: `e_${Date.now()}_${Math.random()}@test.com`,
        passwordHash: 'hashed_password',
        tokenVersion: 0,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides,
    };

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
            const sanitized = sanitizeUser(user);

            prismaMock.user.findUnique.mockResolvedValue(sanitized);

            const result = await userService.getUserProfile(user.id);

            expect(result.id).toBe(user.id);
            expect(result.name).toBe(user.name);
            expect(result.username).toBe(user.username);
            expect(result.email).toBe(user.email);
            expect(result).not.toHaveProperty('passwordHash');
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { id: user.id },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    tokenVersion: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        });

        it('should throw error when user is not found', async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            await expect(userService.getUserProfile('nonexistent')).rejects.toThrow(
                'User not found'
            );
        });

        it('should handle database errors', async () => {
            prismaMock.user.findUnique.mockRejectedValue(new Error('Database error'));

            await expect(userService.getUserProfile('user123')).rejects.toThrow('Database error');
        });
    });

    describe('getFullUserProfile', () => {
        it('should return full user profile including all fields', async () => {
            const user = await createUser();

            prismaMock.user.findUnique.mockResolvedValue(user);

            const result = await userService.getFullUserProfile(user.id);

            expect(result).toEqual(user);
            expect(result.id).toBe(user.id);
            expect(result.name).toBe(user.name);
            expect(result.username).toBe(user.username);
            expect(result.email).toBe(user.email);
            expect(result.passwordHash).toBe(user.passwordHash);
            expect(result.tokenVersion).toBe(user.tokenVersion);
            expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
                where: { id: user.id },
            });
        });

        it('should throw error when user is not found', async () => {
            prismaMock.user.findUnique.mockResolvedValue(null);

            await expect(userService.getFullUserProfile('nonexistent')).rejects.toThrow(
                'User not found'
            );
        });

        it('should handle database errors', async () => {
            prismaMock.user.findUnique.mockRejectedValue(new Error('Connection timeout'));

            await expect(userService.getFullUserProfile('user123')).rejects.toThrow(
                'Connection timeout'
            );
        });

        it('should include passwordHash in the response', async () => {
            const user = await createUser({ passwordHash: 'secure_hash_123' });

            prismaMock.user.findUnique.mockResolvedValue(user);

            const result = await userService.getFullUserProfile(user.id);

            expect(result.passwordHash).toBe('secure_hash_123');
        });
    });

    describe('getUserProfileBy', () => {
        it('should fetch user by username', async () => {
            const user = await createUser();

            prismaMock.user.findFirst.mockResolvedValue({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                tokenVersion: user.tokenVersion,
                passwordHash: false,
            });

            const result = await userService.getUserProfileBy('username', user.username);

            expect(result.username).toBe(user.username);
            expect(result.passwordHash).toBe(false);
            expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
                where: { username: user.username },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    tokenVersion: true,
                    passwordHash: false,
                },
            });
        });

        it('should fetch user by email', async () => {
            const user = await createUser();

            prismaMock.user.findFirst.mockResolvedValue({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                tokenVersion: user.tokenVersion,
                passwordHash: false,
            });

            const result = await userService.getUserProfileBy('email', user.email);

            expect(result.email).toBe(user.email);
            expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
                where: { email: user.email },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    tokenVersion: true,
                    passwordHash: false,
                },
            });
        });

        it('should include password when includePassword is true', async () => {
            const user = await createUser();

            prismaMock.user.findFirst.mockResolvedValue({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                tokenVersion: user.tokenVersion,
                passwordHash: user.passwordHash,
            });

            const result = await userService.getUserProfileBy('username', user.username, true);

            expect(result.passwordHash).toBe(user.passwordHash);
            expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
                where: { username: user.username },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    tokenVersion: true,
                    passwordHash: true,
                },
            });
        });

        it('should exclude password when includePassword is false', async () => {
            const user = await createUser();

            prismaMock.user.findFirst.mockResolvedValue({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                tokenVersion: user.tokenVersion,
                passwordHash: false,
            });

            const result = await userService.getUserProfileBy('email', user.email, false);

            expect(result.passwordHash).toBe(false);
        });

        it('should throw error when field is not provided', async () => {
            await expect(userService.getUserProfileBy('', 'somevalue')).rejects.toThrow(
                'Field name is required'
            );

            await expect(userService.getUserProfileBy(null, 'somevalue')).rejects.toThrow(
                'Field name is required'
            );
        });

        it('should return null when user is not found', async () => {
            prismaMock.user.findFirst.mockResolvedValue(null);

            const result = await userService.getUserProfileBy('username', 'nonexistent');

            expect(result).toBeNull();
        });

        it('should handle database errors', async () => {
            prismaMock.user.findFirst.mockRejectedValue(new Error('Database connection failed'));

            await expect(userService.getUserProfileBy('username', 'testuser')).rejects.toThrow(
                'Database connection failed'
            );
        });

        it('should work with dynamic field names', async () => {
            const user = await createUser({ id: 'custom-id-123' });

            prismaMock.user.findFirst.mockResolvedValue({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                tokenVersion: user.tokenVersion,
                passwordHash: false,
            });

            await userService.getUserProfileBy('id', 'custom-id-123');

            expect(prismaMock.user.findFirst).toHaveBeenCalledWith({
                where: { id: 'custom-id-123' },
                select: expect.any(Object),
            });
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
            expect(prismaMock.user.update).toHaveBeenCalledWith({
                where: { id: user.id },
                data: { role: 'ADMIN' },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    tokenVersion: true,
                    createdAt: true,
                    updatedAt: true,
                    role: true,
                },
            });
        });

        it('should update role to MANAGER', async () => {
            const updatedUser = { ...user, role: 'MANAGER' };
            prismaMock.user.update.mockResolvedValue(updatedUser);

            const result = await userService.updateRole(user.id, 'MANAGER');

            expect(result.role).toBe('MANAGER');
        });

        it('should update role to DRIVER', async () => {
            const updatedUser = { ...user, role: 'DRIVER' };
            prismaMock.user.update.mockResolvedValue(updatedUser);

            const result = await userService.updateRole(user.id, 'DRIVER');

            expect(result.role).toBe('DRIVER');
        });

        it('should update role to USER', async () => {
            const updatedUser = { ...user, role: 'USER' };
            prismaMock.user.update.mockResolvedValue(updatedUser);

            const result = await userService.updateRole(user.id, 'USER');

            expect(result.role).toBe('USER');
        });

        it('should throw an error for an invalid role', async () => {
            await expect(userService.updateRole(user.id, 'INVALID_ROLE')).rejects.toThrow(
                'Invalid role. Must be one of: ADMIN, MANAGER, DRIVER, USER'
            );
        });

        it('should throw an error for lowercase invalid role', async () => {
            await expect(userService.updateRole(user.id, 'superadmin')).rejects.toThrow(
                'Invalid role. Must be one of: ADMIN, MANAGER, DRIVER, USER'
            );
        });

        it('should throw an error for empty role', async () => {
            await expect(userService.updateRole(user.id, '')).rejects.toThrow(
                'Invalid role. Must be one of: ADMIN, MANAGER, DRIVER, USER'
            );
        });

        it('should handle P2025 error (user not found)', async () => {
            const error = new Error('Record not found');
            error.code = 'P2025';
            prismaMock.user.update.mockRejectedValue(error);

            await expect(userService.updateRole('nonexistent', 'ADMIN')).rejects.toThrow(
                'Record not found'
            );
        });

        it('should handle other database errors', async () => {
            prismaMock.user.update.mockRejectedValue(new Error('Connection timeout'));

            await expect(userService.updateRole(user.id, 'ADMIN')).rejects.toThrow(
                'Connection timeout'
            );
        });
    });

    describe('getUsers', () => {
        it('should return a list of users', async () => {
            const user1 = await createUser();
            const user2 = await createUser({
                username: `u2_${Date.now()}`,
                email: `e2_${Date.now()}@test.com`,
            });

            const sanitized1 = sanitizeUser(user1);
            const sanitized2 = sanitizeUser(user2);

            prismaMock.user.findMany.mockResolvedValue([sanitized1, sanitized2]);

            const result = await userService.getUsers();

            expect(result.length).toBe(2);

            result.forEach((u) => {
                expect(u).not.toHaveProperty('passwordHash');
                expect(u).not.toHaveProperty('tokenVersion');
            });

            expect(prismaMock.user.findMany).toHaveBeenCalledWith({
                where: {},
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: { createdAt: 'desc' },
                skip: 0,
                take: 50,
            });
        });

        it('should filter users by role', async () => {
            const admin = await createUser({ role: 'ADMIN' });
            const sanitized = sanitizeUser(admin);

            prismaMock.user.findMany.mockResolvedValue([sanitized]);

            const result = await userService.getUsers({ role: 'ADMIN' });

            expect(result.length).toBe(1);
            expect(prismaMock.user.findMany).toHaveBeenCalledWith({
                where: { role: 'ADMIN' },
                select: expect.any(Object),
                orderBy: { createdAt: 'desc' },
                skip: 0,
                take: 50,
            });
        });

        it('should filter users by role case-insensitively', async () => {
            const driver = await createUser({ role: 'DRIVER' });
            const sanitized = sanitizeUser(driver);

            prismaMock.user.findMany.mockResolvedValue([sanitized]);

            await userService.getUsers({ role: 'driver' });

            expect(prismaMock.user.findMany).toHaveBeenCalledWith({
                where: { role: 'DRIVER' },
                select: expect.any(Object),
                orderBy: { createdAt: 'desc' },
                skip: 0,
                take: 50,
            });
        });

        it('should throw error for invalid role', async () => {
            await expect(userService.getUsers({ role: 'INVALID' })).rejects.toThrow(
                'Invalid role. Must be one of: ADMIN, MANAGER, DRIVER, USER'
            );
        });

        it('should respect custom limit', async () => {
            prismaMock.user.findMany.mockResolvedValue([]);

            await userService.getUsers({ limit: 20 });

            expect(prismaMock.user.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    take: 20,
                })
            );
        });

        it('should respect custom skip', async () => {
            prismaMock.user.findMany.mockResolvedValue([]);

            await userService.getUsers({ skip: 10 });

            expect(prismaMock.user.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    skip: 10,
                })
            );
        });

        it('should enforce maximum limit of 100', async () => {
            prismaMock.user.findMany.mockResolvedValue([]);

            await userService.getUsers({ limit: 200 });

            expect(prismaMock.user.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    take: 100,
                })
            );
        });

        it('should enforce minimum limit of 1', async () => {
            prismaMock.user.findMany.mockResolvedValue([]);

            await userService.getUsers({ limit: 0 });

            expect(prismaMock.user.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    take: 1,
                })
            );
        });

        it('should enforce minimum limit of 1 for negative values', async () => {
            prismaMock.user.findMany.mockResolvedValue([]);

            await userService.getUsers({ limit: -5 });

            expect(prismaMock.user.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    take: 1,
                })
            );
        });

        it('should use default values when no options provided', async () => {
            prismaMock.user.findMany.mockResolvedValue([]);

            await userService.getUsers();

            expect(prismaMock.user.findMany).toHaveBeenCalledWith({
                where: {},
                select: expect.any(Object),
                orderBy: { createdAt: 'desc' },
                skip: 0,
                take: 50,
            });
        });

        it('should handle empty results', async () => {
            prismaMock.user.findMany.mockResolvedValue([]);

            const result = await userService.getUsers();

            expect(result).toEqual([]);
        });

        it('should order by createdAt descending', async () => {
            prismaMock.user.findMany.mockResolvedValue([]);

            await userService.getUsers();

            expect(prismaMock.user.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    orderBy: { createdAt: 'desc' },
                })
            );
        });

        it('should handle database errors', async () => {
            prismaMock.user.findMany.mockRejectedValue(new Error('Database error'));

            await expect(userService.getUsers()).rejects.toThrow('Database error');
        });

        it('should combine limit, skip, and role filters', async () => {
            const manager = await createUser({ role: 'MANAGER' });
            const sanitized = sanitizeUser(manager);

            prismaMock.user.findMany.mockResolvedValue([sanitized]);

            await userService.getUsers({ limit: 25, skip: 5, role: 'MANAGER' });

            expect(prismaMock.user.findMany).toHaveBeenCalledWith({
                where: { role: 'MANAGER' },
                select: expect.any(Object),
                orderBy: { createdAt: 'desc' },
                skip: 5,
                take: 25,
            });
        });

        it('should not include passwordHash in results', async () => {
            const user = await createUser();
            const sanitized = sanitizeUser(user);

            prismaMock.user.findMany.mockResolvedValue([sanitized]);

            const result = await userService.getUsers();

            expect(result[0]).not.toHaveProperty('passwordHash');
            expect(prismaMock.user.findMany).toHaveBeenCalledWith({
                where: {},
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: { createdAt: 'desc' },
                skip: 0,
                take: 50,
            });
        });
    });
});
