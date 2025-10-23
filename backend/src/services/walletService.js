import logger from '../logger';
import User from '../models/User';
import Wallet from '../models/Wallet';

class WalletService {
    async addUserFunds(userId, amount) {
        try {
            logger.info(`Updating funds for user ${userId} by ${amount}`);
            const user = await User.findById(userId);

            if (!user) {
                logger.warn(`User not found for funds update: ${userId}`);
                throw new Error('User not found');
            }

            const wallet = Wallet.findById(user.walletId);

            if (!wallet) {
                logger.warn(`Wallet not found for funds update: ${userId}`);
                throw new Error('Wallet not found');
            }

            if (amount <= 0) {
                logger.warn(`Invalid amount for funds update: ${amount}`);
                throw new Error('Invalid amount');
            }

            wallet.balance += amount;

            return user;
        } catch (error) {
            logger.error(`Failed to update user funds: ${error.message}`, error);
            throw error;
        }
    }
}

export default new WalletService();
