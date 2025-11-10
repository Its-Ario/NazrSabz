import { compare } from 'bcrypt';
import authService from '../services/authService.js';
import logger from '../logger.js';

import { generateToken } from '../utils/auth.js';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) return res.status(403).json({ message: 'Invalid Credentials' });
        if (typeof username !== 'string' || typeof password !== 'string')
            return res.status(403).json({ message: 'Invalid input' });

        const result = await authService.loginWithUsername(username, password);
        if (!result) return res.status(403).json({ message: 'Invalid Credentials' });

        res.json({ token: result.token, user: result.userData });
    } catch (error) {
        logger.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const register = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        if (!name || !email || !username || !password)
            return res.status(400).json({ message: 'Please fill out the form' });
        if (
            typeof name !== 'string' ||
            typeof email !== 'string' ||
            typeof username !== 'string' ||
            typeof password !== 'string' ||
            !password
        )
            return res.status(403).json({ message: 'Invalid input' });

        const newUser = await authService.registerUser({
            name,
            email,
            username,
            password,
            role: 'USER',
        });

        res.status(201).json(newUser);
    } catch (error) {
        logger.error('Register error:', error);
        res.status(500).json({ message: 'Server error', error: `${error}` });
    }
};

export const changepassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string')
        return res.status(403).json({ message: 'Invalid input' });

    const user = req.user;
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await compare(currentPassword, user.passwordHash);
    if (!isMatch) return res.status(403).json({ error: 'Password incorrect' });

    const { token } = await authService.changePassword(user.id, newPassword);

    res.json({ message: 'Password updated successfully', token });
};

export const logout = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(404).json({ error: 'User not found' });

        await authService.updateTokenVersion(user.id);

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        logger.error('Logout error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const verify = async (req, res) => {
    const userData = {
        id: req.user.id.toString(),
        name: req.user.name,
    };

    res.status(200).json({ ok: true, user: userData });
};

export const googleCallback = async (req, res) => {
    const token = generateToken(req.user);

    const redirectUrl = `${CLIENT_URL}?googleToken=${token}`;
    res.redirect(redirectUrl);
};
