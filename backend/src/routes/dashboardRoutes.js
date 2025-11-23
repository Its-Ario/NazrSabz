import { Router } from 'express';
const router = Router();
import auth, { isAdmin } from '../middleware/authMiddleware.js';
import { getDashboardData, getAdminDashboardData } from '../controllers/dashboardController.js';

router.use(auth, isAdmin);

router.get('/', getDashboardData);
router.get('/admin', isAdmin, getAdminDashboardData);

export default router;
