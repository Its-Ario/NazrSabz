import logger from '../logger.js';
import prisma from '../utils/prisma.js';

class UserService {
    async getUserProfile(userId) {
        try {
            logger.info(`Fetching profile for user: ${userId}`);
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    tokenVersion: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });

            if (!user) {
                logger.warn(`User not found: ${userId}`);
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            logger.error(`Failed to get user profile: ${error.message}`, error);
            throw error;
        }
    }

    async getUserProfileBy(field, value) {
        try {
            if (!field) throw new Error('Field name is required');
            logger.info(`Fetching user by ${field}: ${value}`);

            const user = await prisma.user.findFirst({
                where: { [field]: value },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    tokenVersion: true,
                },
            });

            return user;
        } catch (error) {
            logger.error(`Failed to get user by ${field}: ${error.message}`, error);
            throw error;
        }
    }

    async updateRole(userId, newRole) {
        try {
            const validRoles = ['ADMIN', 'USER'];
            if (!validRoles.includes(newRole)) {
                throw new Error(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
            }

            logger.info(`Updating role for user ${userId} to ${newRole}`);

            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: { role: newRole },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    tokenVersion: true,
                    createdAt: true,
                    updatedAt: true,
                    role: true,
                },
            });

            return updatedUser;
        } catch (error) {
            if (error.code === 'P2025') {
                logger.warn(`User not found for role update: ${userId}`);
                throw new Error('User not found');
            }

            logger.error(`Failed to update user role: ${error.message}`, error);
            throw error;
        }
    }

    async getAllUsers({ limit = 50, skip = 0 } = {}) {
        try {
            const safeLimit = Math.min(Math.max(1, limit), 100);
            logger.info(`Fetching all users: limit=${safeLimit}, skip=${skip}`);

            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: safeLimit,
            });

            return users;
        } catch (error) {
            logger.error(`Failed to fetch users: ${error.message}`, error);
            throw error;
        }
    }
}

export default new UserService();
