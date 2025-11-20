import { Router } from 'express';
const router = Router();
import auth, { isAdmin } from '../middleware/authMiddleware.js';
import {
    createRequest,
    updateStatus,
    getRequestById,
    getAllRequests,
    getRequests,
    getRequestStats,
    getTotalWeight,
    getRecentRequests,
    getRequestsHistory,
    updateCollector,
} from '../controllers/requestController.js';

router.use(auth);

router.post('/create', createRequest);
router.post('/update-status', isAdmin, updateStatus);
router.post('/update-collector', isAdmin, updateCollector);
router.get('/get/:id', getRequestById);
router.get('/get', getRequests);
router.get('/all', isAdmin, getAllRequests);
router.get('/stats', getRequestStats);
router.get('/weight/total', getTotalWeight);
router.get('/recent', getRecentRequests);
router.get('/history', getRequestsHistory);

export default router;
