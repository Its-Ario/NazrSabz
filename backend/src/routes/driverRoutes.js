import express from 'express';
import {
    getProfile,
    getRequests,
    updateStatus,
    acceptRequest,
    completeRequest,
} from '../controllers/driverController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(auth);

router.get('/me', getProfile);
router.get('/requests', getRequests);
router.patch('/status', updateStatus);
router.post('/requests/:id/accept', acceptRequest);
router.post('/requests/:id/complete', completeRequest);

export default router;
