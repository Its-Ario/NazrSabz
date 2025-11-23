import userService from '../services/userService.js';
import walletService from '../services/walletService.js';
import requestService from '../services/requestService.js';

export const getDashboardData = async (req, res) => {
    const userId = req.user.id;

    const [user, wallet, stats, totalWeight, recentRequests, breakdown] = await Promise.all([
        userService.getUserProfile(userId),
        walletService.getWalletByUser(userId),
        requestService.getRequestStats(userId, 'requester'),
        requestService.getTotalRequestedWeight(userId),
        requestService.getRequestsByRequester(userId, { limit: 5, page: 1 }),
        requestService.getWeightBreakdownByMaterial(userId),
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
        breakdown: breakdown,
    };

    res.status(200).json({ ok: true, result });
};

export const getAdminDashboardData = async (req, res) => {
    // const userId = req.user.id;

    const result = {
        stats: {
            totalWeight: 12450,
            activeUsers: 1280,
            activeDrivers: 42,
            pendingRequests: 15,
            completedToday: 48,
            completedRequests: 30,
            totalRevenue: 125000000,
            avgResponseTime: 8,
        },
        charts: {
            weeklyRequests: [10, 20, 15, 40, 35, 20, 60],
            breakdown: { plastic: 300, paper: 150, glass: 50, metal: 100 },
            revenue: [100, 120, 110, 140, 130, 180],
        },
        recentActivity: [
            // Array of recent logs
        ],
        recentTransactions: [
            // Array of recent payouts
        ],
    };

    res.status(200).json({ ok: true, result });
};
