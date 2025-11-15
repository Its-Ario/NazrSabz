import { prismaMock } from './tests/__mocks__/prismaClient.js';
import { jest } from '@jest/globals';

global.prismaMock = prismaMock;

beforeEach(() => {
    jest.clearAllMocks();
});
