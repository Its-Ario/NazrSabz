import { Router } from 'express';
const router = Router();
import auth, { isAdmin } from '../middleware/authMiddleware.js';
import {
    createRequest,
    updateStatus,
    getRequestById,
    getAllRequests,
} from '../controllers/requestController.js';

router.use(auth);

router.post('/create', createRequest);
router.post('/update-status', isAdmin, updateStatus);
router.get('/get', isAdmin, getRequestById);
router.get('/all', isAdmin, getAllRequests);

export default router;
