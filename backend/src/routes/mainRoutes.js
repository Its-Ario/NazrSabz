import { Router } from 'express';
import userService from '../services/userService.js';
import auth, { isAdmin } from '../middleware/authMiddleware.js';
const router = new Router();

router.get('/users', auth, isAdmin, async (req, res) => {
    const { role } = req.query;

    if (typeof role !== 'string') {
        return res.status(400).json({ ok: false, message: 'Invalid Role' });
    }

    let users = await userService.getUsers({ role });

    res.json({ ok: true, users });
});

export default router;
