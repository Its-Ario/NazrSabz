import logger from '../logger.js';
import AppError from '../utils/AppError.js';
import { handlePrismaError } from '../utils/prismaErrorHandler.js';

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
    logger.error({
        code: err.code,
        message: err.message,
        meta: err.meta,
    });
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            ok: false,
            message: err.message,
            ...(Object.keys(err.meta).length ? { meta: err.meta } : {}),
        });
    }

    const handled = handlePrismaError(err);

    res.status(handled.status || 500).json({
        ok: false,
        message: handled.message,
    });
}
