import walletService from '../src/services/walletService.js';

describe('WalletService', () => {
    describe('addUserFunds', () => {
        it('should correctly add funds to a user account', async () => {
            const user = await createUser();
            user.balance = 100;
            await user.save();

            const result = await walletService.updateUserFunds(user.id.toString(), 50);

            expect(result.balance).toBe(150);
        });

        it('should throw an error if the user is not found', async () => {
            const userId = new Types.ObjectId();

            await expect(userService.updateUserFunds(userId.toString(), 50)).rejects.toThrow(
                'User not found'
            );
        });
    });
});
