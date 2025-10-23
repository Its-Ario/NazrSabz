import { jest } from '@jest/globals';
import userService from '../src/services/userService.js';
import User from '../src/models/User.js';
import { Types } from 'mongoose';

jest.mock('bcrypt', () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
}));

async function createUser(overrides = {}) {
    const defaultData = {
        username: 'u',
        balance: 20,
        passwordHash: '1',
        email: 'a@b.com',
        type: 'user',
        walletId: Types.ObjectId(1)
    };

    const user = await User.create({
        ...defaultData,
        ...overrides,
    });

    return user;
}

describe('userService', () => {
    describe('getUserProfile', () => {
        it('should return a user profile by ID', async () => {
            const user = await createUser();
            const result = await userService.getUserProfile(user.id.toString());

            expect(result._id).toEqual(user._id);
            expect(result.name).toBe(user.name);
        });
    });

    describe('updateRole', () => {
        let user;

        beforeEach(async () => {
            user = await createUser();
        });
        it('should update the user role successfully', async () => {
            const result = await userService.updateRole(user.id.toString(), 'ADMIN');

            expect(result.role).toBe('ADMIN');
        });

        it('should throw an error for an invalid role', async () => {
            await expect(
                userService.updateRole(user.id.toString(), 'INVALID_ROLE')
            ).rejects.toThrow('Invalid role. Must be one of: ADMIN, MEMBER');
        });
    });

    describe('getAllUsers', () => {
        it('should return a list of users', async () => {
            const user1 = await createUser();
            await createUser({ username: 'u2', email: 'a2@b.com' });

            const result = await userService.getAllUsers();

            expect(result.length).toBe(2);
            expect(result[0].username).toBe(user1.username);

            result.forEach((user) => {
                expect(user).not.toHaveProperty('passwordHash');
                expect(user).not.toHaveProperty('tokenVersion');
            });
        });
    });
});
