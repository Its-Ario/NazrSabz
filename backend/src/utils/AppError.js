export default class AppError extends Error {
    constructor(message, statusCode = 400, meta = {}) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.isOperational = true;
        this.meta = meta;
    }
}
export const throwError = (message, status = 400, meta = {}) => {
    throw new AppError(message, status, meta);
};
