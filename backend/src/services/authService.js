import logger from '../logger.js';
import { generateToken } from '../utils/auth.js';
import bcrypt from 'bcrypt';
import userService from './userService.js';
import prisma from '../utils/prisma.js';

class AuthService {
    async registerUser({ name, username, email, password }) {
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedUsername = username.trim();

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: normalizedEmail }, { username: normalizedUsername }],
            },
        });

        if (existingUser) {
            throw new Error('User with this email or username already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    name: name.trim(),
                    username: normalizedUsername,
                    email: normalizedEmail,
                    passwordHash: hashedPassword,
                },
            });

            await tx.wallet.create({ data: { userId: newUser.id } });

            return newUser;
        });

        // eslint-disable-next-line no-unused-vars
        const { passwordHash, ...userSafe } = result;
        return userSafe;
    }

    async loginWithUsername(username, password) {
        const user = await userService.getUserProfileBy('username', username, true);
        if (!user) return false;

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return false;

        const token = generateToken(user);

        return {
            token,
            userData: {
                id: user.id,
                name: user.name,
            },
        };
    }

    async changePassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return this.updateTokenVersion(userId, hashedPassword);
    }

    async updateTokenVersion(userId, newPasswordHash) {
        try {
            logger.info(`Incrementing tokenVersion for user: ${userId}`);

            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    tokenVersion: { increment: 1 },
                    ...(newPasswordHash ? { passwordHash: newPasswordHash } : {}),
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                    tokenVersion: true,
                },
            });

            return user;
        } catch (error) {
            if (error.code === 'P2025') {
                throw new Error('User not found');
            }
            logger.error(`Failed to update tokenVersion: ${error.message}`, error);
            throw error;
        }
    }
}

export default new AuthService();
