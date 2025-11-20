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
} from '../controllers/requestController.js';

router.use(auth);

router.post('/create', createRequest);
router.post('/update-status', isAdmin, updateStatus);
router.get('/get/:id', isAdmin, getRequestById);
router.get('/get', getRequests);
router.get('/all', isAdmin, getAllRequests);
router.get('/stats', getRequestStats);
router.get('/weight/total', getTotalWeight);

export default router;
