import logger from '../logger.js';
import { generateToken } from '../utils/auth.js';
import bcrypt from 'bcrypt';
import userService from './userService.js';
import prisma from '../utils/prisma.js';
import { throwError } from '../utils/AppError.js';

export class AuthService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }

    async registerUser({ name, username, email, phoneNumber, password }) {
        if (!email && !phoneNumber) {
            throwError('User must have at least one of email or phone number', 400, {
                code: 'ERR_INVALID_INPUT',
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedUsername = username.trim();

        const conditions = [{ username: normalizedUsername }];

        if (normalizedEmail) {
            conditions.push({ email: normalizedEmail });
        }
        if (phoneNumber) {
            conditions.push({ phoneNumber });
        }

        const existingUser = await this.prisma.user.findFirst({
            where: { OR: conditions },
        });

        if (existingUser) {
            throwError('User with this email or username already exists.', 409, {
                code: 'ERR_ALREADY_EXISTS',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await this.prisma.$transaction(async (tx) => {
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

        // eslint-disable-next-line no-unused-vars
        const { passwordHash, tokenVersion, ...safeUser } = user;

        return {
            token,
            userData: safeUser,
        };
    }

    async changePassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const newUser = this.updateTokenVersion(userId, hashedPassword);
        const token = generateToken(newUser);

        return { user: newUser, token };
    }

    async updateTokenVersion(userId, newPasswordHash) {
        try {
            logger.info(`Incrementing tokenVersion for user: ${userId}`);

            const user = await this.prisma.user.update({
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
                logger.warn(`User not found: ${userId}`);
                throwError('User not found', 404, { code: 'ERR_USER_NOT_FOUND' });
            }
            logger.error(`Failed to update tokenVersion: ${error.message}`, error);
            throw error;
        }
    }
}

export default new AuthService(prisma);
