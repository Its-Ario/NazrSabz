import prisma from './src/utils/prisma.js';

export const connect = async () => {
    await prisma.$connect();
};

export const clearDatabase = async () => {
    await prisma.$transaction([
        prisma.transaction.deleteMany(),
        prisma.wallet.deleteMany(),
        prisma.request.deleteMany(),
        prisma.user.deleteMany(),
    ]);
};

export const closeDatabase = async () => {
    await prisma.$disconnect();
};
