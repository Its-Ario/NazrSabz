import walletService from '../services/walletService.js';
import transactionService from '../services/transactionService.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import logger from '../logger.js';

export const createTransaction = asyncHandler(async (req, res) => {
    const { userId, requestId, action, amount } = req.body;

    if (
        typeof userId !== 'string' ||
        typeof requestId !== 'string' ||
        typeof action !== 'string' ||
        typeof amount !== 'number'
    ) {
        return res.status(400).json({ ok: false, message: 'Invalid Input' });
    }

    try {
        const transaction = await transactionService.createTransaction({
            userId,
            requestId,
            action,
            amount,
        });
        res.status(200).json({ ok: true, transaction });
    } catch (e) {
        logger.warn('Failed to create transaction:', e.message);
        res.status(400).json({ ok: false, message: e.message });
    }
});

export const getTransactionById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (typeof id !== 'string') {
        return res.status(400).json({ ok: false, message: 'Invalid Input' });
    }

    try {
        const transaction = await transactionService.getTransactionById(id);
        res.status(200).json({ ok: true, data: transaction });
    } catch (e) {
        logger.warn(`Failed to fetch transaction: ${id} - ${e.message}`);
        res.status(400).json({ ok: false, message: e.message });
    }
});

export const getUserTransactions = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    try {
        const transactions = await transactionService.getUserTransactions(userId);
        res.status(200).json({ ok: true, data: transactions });
    } catch (e) {
        logger.warn(`Failed to fetch user transactions: ${e.message}`);
        res.status(400).json({ ok: false, message: e.message });
    }
});

export const addFunds = asyncHandler(async (req, res) => {
    const { amount, userId } = req.body;

    if (typeof amount !== 'number' || typeof userId !== 'string') {
        return res.status(400).json({ ok: false, message: 'Invalid Input' });
    }

    try {
        const wallet = await walletService.addUserFunds(userId, amount);

        res.status(200).json({ ok: true, data: { balance: wallet.balance } });
    } catch (e) {
        logger.warn(`Failed to update funds for user: ${userId} - ${e.message}`);
        res.status(400).json({ ok: false, message: e.message });
    }
});

export const getAllTransactions = asyncHandler(async (req, res) => {
    const transactions = await transactionService.getAllTransactions();

    res.status(200).json({ ok: true, data: transactions });
});
