import authService from '../src/services/authService.js';
import { Types } from 'mongoose';
import User from '../src/models/User.js';

async function createUser(overrides = {}) {
    const defaultData = {
        name: 'n',
        username: 'u',
        balance: 20,
        passwordHash: '1',
        email: 'a@b.com',
    };

    const user = await User.create({
        ...defaultData,
        ...overrides,
    });

    return user;
}

describe('authService', () => {
    describe('registerUser', () => {
        const userData = {
            name: 'n',
            username: 'u',
            password: 'p',
            email: 'a@b.com',
        };
        it('should create and save a new user successfully', async () => {
            const result = await authService.registerUser(userData);

            expect(result).not.toHaveProperty('password');
            expect(result).not.toHaveProperty('passwordHash');
            expect(result.username).toBe(userData.username);
        });

        it('should throw an error if the user already exists', async () => {
            await createUser();

            await expect(authService.registerUser(userData)).rejects.toThrow(
                'User with this email or username already exists.'
            );
        });
    });

    describe('updateTokenVersion', () => {
        it('should increment tokenVersion for a user', async () => {
            const user = await createUser();
            user.tokenVersion = 0;
            await user.save();

            const updatedUser = await authService.updateTokenVersion(user.id.toString());

            expect(updatedUser.tokenVersion).toBe(1);
        });

        it('should throw an error if the user is not found', async () => {
            const userId = new Types.ObjectId();

            await expect(authService.updateTokenVersion(userId.toString())).rejects.toThrow(
                'User not found'
            );
        });
    });
});
