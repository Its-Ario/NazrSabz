import { Router } from 'express';
import requestService from '../services/requestService.js';
const router = Router();
import auth from '../middleware/authMiddleware.js';

router.use(auth);

router.post('/create', async (req, res) => {
    const result = await requestService.createRequest(req.body);

    res.json(result);
});

export default router;
