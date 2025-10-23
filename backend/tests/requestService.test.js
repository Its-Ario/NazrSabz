import { Types } from 'mongoose';
import authService from '../src/services/authService';
import User from '../src/models/User';

async function createUser(overrides = {}) {
    const defaultData = {
        username: 'u',
        balance: 20,
        passwordHash: '1',
        email: 'a@b.com',
        type: 'user',
        walletId: new Types.ObjectId(),
    };

    const user = await User.create({
        ...defaultData,
        ...overrides,
    });

    return user;
}

describe('RequestService', () => {
    describe('createRequest', () => {
        const userData = {
            username: 'u',
            passwordHash: '1',
            email: 'a@b.com',
            type: 'user',
            walletId: new Types.ObjectId(),
        };
        const requestData = {};
        it('should create and save a new request successfully', async () => {
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
});
