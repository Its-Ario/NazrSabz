import { Prisma } from '../../generated/prisma/default.js';

export function handlePrismaError(error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                return {
                    status: 400,
                    message: `Duplicate value for field: ${error.meta?.target?.join(', ')}`,
                };
            case 'P2025':
                return {
                    status: 404,
                    message: `Record not found or already deleted.`,
                };
            case 'P2003':
                return {
                    status: 400,
                    message: `Invalid reference to another record.`,
                };
            default:
                return {
                    status: 500,
                    message: `Database error (${error.code})`,
                };
        }
    }

    if (error instanceof Prisma.PrismaClientValidationError) {
        return {
            status: 400,
            message: `Invalid data format for database query.`,
        };
    }

    if (error instanceof Prisma.PrismaClientInitializationError) {
        return {
            status: 503,
            message: `Database connection failed.`,
        };
    }

    return {
        status: 500,
        message: `An unexpected error occurred.`,
    };
}
