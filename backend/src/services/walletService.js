import logger from '../logger.js';
import { throwError } from '../utils/AppError.js';
import prisma from '../utils/prisma.js';

class WalletService {
    async createWallet(userId) {
        logger.info(`Creating wallet for ${userId}`);

        const wallet = await prisma.wallet.create({
            data: {
                userId,
                balance: 0,
            },
        });

        return wallet;
    }

    async addUserFunds(userId, amount) {
        if (amount <= 0) {
            logger.warn(`Invalid amount for funds update: ${amount}`);
            throwError('Invalid amount', 400, { code: 'ERROR_INVALID_AMOUNT' });
        }

        try {
            logger.info(`Adding ${amount} funds to wallet of user ${userId}`);

            const wallet = await prisma.wallet.update({
                where: { userId },
                data: { balance: { increment: amount } },
            });

            return wallet;
        } catch (error) {
            if (error.code === 'P2025') {
                logger.warn(`User not found ${userId}`);
                throwError('User not found', 404, { code: 'ERR_USER_NOT_FOUND' });
            }

            logger.error(`Failed to update user funds: ${error.message}`, error);
            throw error;
        }
    }

    async getWalletByUser(userId) {
        return await prisma.wallet.findUnique({
            where: { userId },
        });
    }
}

export default new WalletService();
