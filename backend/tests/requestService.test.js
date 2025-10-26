import prisma from '../src/utils/prisma.js';
import requestService from '../src/services/requestService.js';
import walletService from '../src/services/walletService.js';

async function createUser(overrides = {}) {
    const defaultData = {
        name: 'n',
        username: `u_${Date.now()}`,
        email: `e_${Date.now()}@b.com`,
        passwordHash: 'hashed_password',
        tokenVersion: 0,
    };

    const user = await prisma.user.create({
        data: { ...defaultData, ...overrides },
    });

    await walletService.createWallet(user.id);

    return user;
}

describe('RequestService', () => {
    describe('createRequest', () => {
        it('should create and save a new request successfully', async () => {
            const user = await createUser();

            const requestData = {
                requesterId: user.id,
                items: [
                    { name: 'Plastic Bottles', weight: 5, notes: 'Only clear bottles, no caps' },
                    { name: 'Cardboard Boxes', weight: 3 },
                ],
                address: {
                    street: '123 Green Street',
                    city: 'EcoCity',
                    postalCode: '12345',
                    location: { type: 'Point', coordinates: [12.345678, 98.765432] },
                },
                status: 'pending',
                scheduledAt: new Date('2025-10-30T09:00:00.000Z'),
                completedAt: null,
                priority: 'high',
                metadata: { weight: 8, category: 'recyclable' },
            };

            const result = await requestService.createRequest(requestData);

            expect(result).toBeDefined();
            expect(result.requesterId).toBe(user.id);
            expect(result.items.length).toBe(2);
            expect(result.status).toBe('pending');
        });
    });
});
