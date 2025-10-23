import User from '../models/User.js';
import logger from '../logger.js';

class UserService {
    async getUserProfile(userId) {
        try {
            logger.info(`Fetching profile for user: ${userId}`);
            return User.findById(userId).select('-passwordHash').lean();
        } catch (error) {
            logger.error(`Failed to get user profile: ${error.message}`, error);
            throw error;
        }
    }

    async getUserProfileBy(field, value) {
        try {
            if (!field) throw new Error('Field name is required');
            logger.info(`Fetching user by ${field}: ${value}`);
            const query = { [field]: value };
            return User.findOne(query).lean();
        } catch (error) {
            logger.error(`Failed to get user by ${field}: ${error.message}`, error);
            throw error;
        }
    }

    async updateRole(userId, newRole) {
        try {
            const validRoles = ['ADMIN', 'MEMBER'];
            if (!validRoles.includes(newRole)) {
                throw new Error(`Invalid role. Must be one of: ${validRoles.join(', ')}`);
            }

            logger.info(`Updating role for user ${userId} to ${newRole}`);
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { role: newRole },
                { new: true, runValidators: true }
            ).select('-passwordHash');

            if (!updatedUser) {
                logger.warn(`User not found for role update: ${userId}`);
                throw new Error('User not found');
            }

            return updatedUser;
        } catch (error) {
            logger.error(`Failed to update user role: ${error.message}`, error);
            throw error;
        }
    }

    async getAllUsers({ limit = 50, skip = 0 } = {}) {
        try {
            const safeLimit = Math.min(Math.max(1, limit), 100);
            logger.info(`Fetching all users: limit=${safeLimit}, skip=${skip}`);
            return User.find()
                .select('-passwordHash -tokenVersion -__v')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(safeLimit)
                .lean();
        } catch (error) {
            logger.error(`Failed to fetch users: ${error.message}`, error);
            throw error;
        }
    }
}

export default new UserService();
