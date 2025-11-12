import logger from '../logger.js';
import { throwError } from '../utils/AppError.js';
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
                throwError('User not found', 404, { code: 'ERR_USER_NOT_FOUND' });
            }

            return user;
        } catch (error) {
            logger.error(`Failed to get user profile: ${error.message}`, error);
            throw error;
        }
    }

    async getFullUserProfile(userId) {
        try {
            logger.info(`Fetching profile for user: ${userId}`);
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                logger.warn(`User not found: ${userId}`);
                throwError('User not found', 404, { code: 'ERR_USER_NOT_FOUND' });
            }

            return user;
        } catch (error) {
            logger.error(`Failed to get user profile: ${error.message}`, error);
            throw error;
        }
    }

    async getUserProfileBy(field, value, includePassword = false) {
        try {
            if (!field) throwError('Field name is required', 400, { code: 'ERR_FIELD_REQUIRED' });
            logger.info(`Fetching user by ${field}: ${value}`);

            const user = await prisma.user.findFirst({
                where: { [field]: value },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    email: true,
                    tokenVersion: true,
                    passwordHash: includePassword,
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
            const validRoles = ['ADMIN', 'MANAGER', 'DRIVER', 'USER'];
            if (!validRoles.includes(newRole)) {
                throwError(`Invalid role. Must be one of: ${validRoles.join(', ')}`, 400, {
                    code: 'ERR_INVALID_ROLE',
                });
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
            } else {
                logger.error(`Failed to update user role: ${error.message}`, error);
            }
            throw error;
        }
    }

    async getUsers({ limit = 50, skip = 0, role = null } = {}) {
        try {
            const validRoles = ['ADMIN', 'MANAGER', 'DRIVER', 'USER'];
            if (role !== null && !validRoles.includes(role.toUpperCase())) {
                throwError(`Invalid role. Must be one of: ${validRoles.join(', ')}`, 400, {
                    code: 'ERR_INVALID_ROLE',
                });
            }

            const safeLimit = Math.min(Math.max(1, limit), 100);
            logger.info(`Fetching all users: limit=${safeLimit}, skip=${skip}`);

            const users = await prisma.user.findMany({
                where: role ? { role: role.toUpperCase() } : {},
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
