import { compare, hash } from 'bcrypt';
import authService from '../services/authService.js';
import logger from '../logger.js';

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) return res.status(403).json({ message: 'Invalid Credentials' });
        if (typeof username !== String || typeof password !== String)
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
            typeof name !== String ||
            typeof email !== String ||
            typeof username !== String ||
            typeof password !== String
        )
            return res.status(403).json({ message: 'Invalid input' });

        const hashedPassword = await hash(password, 10);

        const newUser = await authService.registerUser({
            name,
            email,
            username,
            passwordHash: hashedPassword,
            role: 'USER',
        });

        res.status(201).json(newUser);
    } catch (error) {
        logger.error('Register error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const changepassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (typeof currentPassword !== String || typeof password !== String)
        return res.status(403).json({ message: 'Invalid input' });

    const user = req.user;
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await compare(currentPassword, user.passwordHash);
    if (!isMatch) return res.status(403).json({ error: 'Password incorrect' });

    await authService.changePassword(user.id, newPassword);

    res.json({ message: 'Password updated successfully' });
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
