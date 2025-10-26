import { connect, clearDatabase, closeDatabase } from './jest-prisma-setup.js';

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});
