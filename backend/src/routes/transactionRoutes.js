import { Router } from 'express';
const router = Router();
import {
    addFunds,
    createTransaction,
    getAllTransactions,
    getTransactionById,
    getUserTransactions,
} from '../controllers/transactionController.js';
import auth, { isAdmin } from '../middleware/authMiddleware.js';

router.use(auth);

router.post('/create', createTransaction);

router.get('/my-transactions', getUserTransactions);
router.get('/:id', getTransactionById);

router.post('/add-funds', addFunds);

router.get('/all', isAdmin, getAllTransactions);

export default router;
