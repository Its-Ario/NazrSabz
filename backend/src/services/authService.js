import User from '../models/User.js';
import logger from '../logger.js';
import { generateToken } from '../utils/auth.js';
import bcrypt from 'bcrypt';
import walletService from './walletService.js';
import userService from './userService.js';

class AuthService {
    async registerUser({ name, username, email, password }) {
        try {
            logger.info(`Registering user: ${username} (${email})`);

            const normalizedEmail = email.trim().toLowerCase();
            const normalizedUsername = username.trim();

            const existingUser = await User.findOne({
                $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
            });

            if (existingUser) {
                logger.warn(`Duplicate user: ${normalizedUsername} or ${normalizedEmail}`);
                throw new Error('User with this email or username already exists.');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name: name.trim(),
                username: normalizedUsername,
                email: normalizedEmail,
                passwordHash: hashedPassword,
            });

            await newUser.save();

            const wallet = await walletService.createWallet(newUser.id);
            newUser.walletId = wallet.id;

            await newUser.save();

            logger.info(`User registered successfully: ${newUser._id}`);

            const { passwordHash, ...userSafe } = newUser.toObject();
            return userSafe;
        } catch (error) {
            logger.error(`Failed to register user: ${error.message}`, { stack: error.stack });
            throw error;
        }
    }
    async loginWithUsername(username, password) {
        const user = await userService.getUserProfileBy('username', username);
        if (!user) return false;
        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
            return false;
        }

        const token = generateToken(user);

        const userData = {
            id: user._id.toString(),
            name: user.name,
        };

        logger.info(`User logged in: ${user.name}`);

        return { token, userData };
    }

    async changePassword(user, newPassword) {
        user.passwordHash = await bcrypt.hash(newPassword, 10);
        return await userService.updateTokenVersion(user._id.toString());
    }

    async updateTokenVersion(userId) {
        try {
            logger.info(`Incrementing tokenVersion for user: ${userId}`);
            const user = await User.findByIdAndUpdate(
                userId,
                { $inc: { tokenVersion: 1 } },
                { new: true }
            ).select('-passwordHash');

            if (!user) {
                logger.warn(`User not found for tokenVersion update: ${userId}`);
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            logger.error(`Failed to update tokenVersion: ${error.message}`, error);
            throw error;
        }
    }
}

export default new AuthService();
