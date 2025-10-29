import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import passport from '../config/passport.js';
import { generateToken } from '../utils/auth.js';

import { login, register, changepassword, logout } from '../controllers/authController.js';

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const router = Router();

router.get('/verify-token', auth, async (req, res) => {
    const userData = {
        id: req.user.id.toString(),
        name: req.user.name,
    };

    res.status(200).json({ ok: true, user: userData });
});

router.post('/login', login);

router.post('/register', register);

router.patch('/changepassword', auth, changepassword);

router.post('/logout', auth, logout);

router.get(
    '/login/google',
    passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email'],
        prompt: 'select_account',
        accessType: 'offline',
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/', session: false }),
    async (req, res) => {
        console.log(req.user);
        const token = generateToken(req.user);

        const redirectUrl = `${CLIENT_URL}/login?googleToken=${token}`;
        res.redirect(redirectUrl);
    }
);

export default router;
