import { Router } from 'express';
const router = Router();
import auth from '../middleware/authMiddleware.js';
import { getDashboardData } from '../controllers/dashboardController.js';

router.use(auth);

router.get('/', getDashboardData);

export default router;
