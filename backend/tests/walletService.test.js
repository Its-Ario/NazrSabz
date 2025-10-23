import walletService from '../src/services/walletService.js';
import { Types } from 'mongoose';
import User from '../src/models/User.js';

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

describe('WalletService', () => {
    describe('addUserFunds', () => {
        it('should correctly add funds to a user account', async () => {
            const user = await createUser();
            user.balance = 100;
            await user.save();

            const result = await walletService.addUserFunds(user.id.toString(), 50);

            expect(result.balance).toBe(150);
        });

        it('should throw an error if the user is not found', async () => {
            const userId = new Types.ObjectId();

            await expect(walletService.addUserFunds(userId.toString(), 50)).rejects.toThrow(
                'User not found'
            );
        });
    });
});
