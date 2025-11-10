import walletService from '../services/walletService.js';
import transactionService from '../services/transactionService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import logger from '../logger.js';

export const createTransaction = asyncHandler(async (req, res) => {
    const { userId, requestId, action, amount } = req.body;

    try {
        const transaction = await transactionService.createTransaction({
            userId,
            requestId,
            action,
            amount,
        });
        res.status(200).json({ success: true, transaction });
    } catch (e) {
        logger.warn('Failed to create transaction:', e.message);
        res.status(400).json({ success: false, message: e.message });
    }
});

export const getTransactionById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const transaction = await transactionService.getTransactionById(id);
        res.status(200).json({ success: true, data: transaction });
    } catch (e) {
        logger.warn(`Failed to fetch transaction: ${id} - ${e.message}`);
        res.status(400).json({ success: false, message: e.message });
    }
});

export const getUserTransactions = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const transactions = await transactionService.getUserTransactions(userId);

    res.status(200).json({ success: true, data: transactions });
});

export const addFunds = asyncHandler(async (req, res) => {
    const { amount, userId } = req.body;

    const wallet = await walletService.addUserFunds(userId, amount);

    res.status(200).json({ success: true, data: { balance: wallet.balance } });
});

export const getAllTransactions = asyncHandler(async (req, res) => {
    const transactions = await transactionService.getAllTransactions();

    res.status(200).json({ success: true, data: transactions });
});
