import User from '../models/User';
import logger from '../logger';
import { generateToken } from '../utils/auth.js';

class AuthService {
    async registerUser(userData) {
        try {
            const { name, username, email, password } = userData;
            logger.info(`Registering user: ${username} (${email})`);

            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                logger.warn(`User already exists: ${username} or ${email}`);
                throw new Error('User with this email or username already exists.');
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                name,
                username,
                email,
                passwordHash: hashedPassword,
            });

            await newUser.save();
            logger.info(`User created: ${newUser._id}`);

            const userObject = newUser.toObject();
            delete userObject.passwordHash;
            return userObject;
        } catch (error) {
            logger.error(`Failed to register user: ${error.message}`, error);
            throw error;
        }
    }
    async loginWithUsername(username, password) {
        const user = await userService.getUserProfileBy('username', username);
        if (!user) return false;
        const isMatch = await compare(password, user.passwordHash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
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
        user.passwordHash = await hash(newPassword, 10);
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
