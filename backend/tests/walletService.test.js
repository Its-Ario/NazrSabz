import walletService from '../src/services/walletService.js';
import { Types } from 'mongoose';
import Wallet from '../src/models/Wallet.js';
import User from '../src/models/User.js';

async function createUser(overrides = {}) {
    const defaultData = {
        username: 'u',
        balance: 20,
        passwordHash: '1',
        email: 'a@b.com',
        type: 'user',
    };

    const user = await User.create({
        ...defaultData,
        ...overrides,
    });

    const wallet = new Wallet({
        userId: user._id,
        balance: 100,
    });
    await wallet.save();

    user.walletId = wallet._id;
    await user.save();

    return user;
}

describe('WalletService', () => {
    describe('addUserFunds', () => {
        it('should correctly add funds to a user account', async () => {
            const user = await createUser();

            const result = await walletService.addUserFunds(user._id.toString(), 50);

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
