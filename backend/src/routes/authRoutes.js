import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import passport from '../config/passport.js';
import {
    login,
    register,
    changepassword,
    logout,
    verify,
    googleCallback,
} from '../controllers/authController.js';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.patch('/changepassword', auth, changepassword);
router.post('/logout', auth, logout);
router.get('/verify-token', auth, verify);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/', session: false }),
    googleCallback
);

router.get(
    '/login/google',
    passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email'],
        prompt: 'select_account',
        accessType: 'offline',
    })
);

export default router;
