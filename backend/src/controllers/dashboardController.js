import userService from '../services/userService.js';
import walletService from '../services/walletService.js';
import requestService from '../services/requestService.js';

export const getDashboardData = async (req, res) => {
    const userId = req.user.id;

    try {
        const [user, wallet, stats, totalWeight, recentRequests] = await Promise.all([
            userService.getUserProfile(userId),
            walletService.getWalletByUser(userId),
            requestService.getRequestStats(userId, 'requester'),
            requestService.getTotalRequestedWeight(userId),
            requestService.getRequestsByRequester(userId, { limit: 5, page: 1 }),
        ]);

        const result = {
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
            },
            walletBalance: wallet?.balance || 0,
            totalWeight: totalWeight,
            successfulRequests: stats.COMPLETED || 0,
            pendingRequests: stats.PENDING || 0,
            canceledRequests: stats.CANCELED || 0,
            totalRequests: stats.total || 0,
            stats: stats,
            recentRequests: recentRequests.requests || [],
        };

        res.status(200).json({ ok: true, result });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};
