import logger from '../logger.js';
import User from '../models/User.js';
import Wallet from '../models/Wallet.js';

class WalletService {
    async createWallet(userId) {
        logger.info(`Creating wallet for ${userId}`);

        const wallet = new Wallet({
            userId,
        });

        await wallet.save();

        return wallet;
    }
    async addUserFunds(userId, amount) {
        try {
            logger.info(`Updating funds for user ${userId} by ${amount}`);
            const user = await User.findById(userId);

            if (!user) {
                logger.warn(`User not found for funds update: ${userId}`);
                throw new Error('User not found');
            }

            const wallet = await Wallet.findById(user.walletId);

            if (!wallet) {
                logger.warn(`Wallet not found for funds update: ${userId}`);
                throw new Error('Wallet not found');
            }

            if (amount <= 0) {
                logger.warn(`Invalid amount for funds update: ${amount}`);
                throw new Error('Invalid amount');
            }

            wallet.balance += amount;
            await wallet.save();

            return wallet;
        } catch (error) {
            logger.error(`Failed to update user funds: ${error.message}`, error);
            throw error;
        }
    }
}

export default new WalletService();
