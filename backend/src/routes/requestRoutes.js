import { Router } from 'express';
const router = Router();
import auth, { isAdmin } from '../middleware/authMiddleware.js';
import { createRequest, updateStatus, getRequestById } from '../controllers/requestController.js';

router.use(auth);

router.post('/create', createRequest);
router.post('/update', isAdmin, updateStatus);
router.get('/get', isAdmin, getRequestById);

export default router;
