import { mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '../../generated/prisma/client.js';

export const prismaMock = mockDeep(PrismaClient);

export const getPrismaMock = () => prismaMock;
