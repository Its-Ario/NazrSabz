import { Router } from 'express';
const router = Router();
import auth from '../middleware/authMiddleware.js';
import { getWallet, addFunds } from '../controllers/walletController.js';

router.use(auth);

router.get('/balance', getWallet);
router.post('/deposit', addFunds);

export default router;
