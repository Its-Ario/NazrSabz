import walletService from '../services/walletService.js';

export const getWallet = async (req, res) => {
    const userId = req.user.id;

    const result = await walletService.getWalletByUser(userId);

    if (!result) {
        return res.status(404).json({ ok: false, message: 'Wallet not found' });
    }

    res.status(200).json({ ok: true, result });
};

export const addFunds = async (req, res) => {
    const userId = req.user.id;
    const { amount } = req.body;

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ ok: false, message: 'Invalid amount' });
    }

    const result = await walletService.addUserFunds(userId, amount);
    res.status(200).json({ ok: true, result });
};
