import { prismaMock } from './__mocks__/prismaClient.js';
import { RequestService } from '../src/services/requestService.js';

let requestService;

beforeEach(() => {
    requestService = new RequestService(prismaMock);

    prismaMock.$transaction.mockImplementation(async (cb) => {
        return cb(prismaMock);
    });
});

async function createUser(overrides = {}) {
    const fakeUser = {
        id: '1',
        name: 'n',
        username: `u_${Date.now()}`,
        email: `e_${Date.now()}@b.com`,
        passwordHash: 'hashed_password',
        tokenVersion: 0,
        ...overrides,
    };

    prismaMock.user.create.mockResolvedValue(fakeUser);
    prismaMock.wallet.create.mockResolvedValue({ userId: fakeUser.id, balance: 0 });

    await prismaMock.user.create({ data: fakeUser });
    await prismaMock.wallet.create({ data: { userId: fakeUser.id, balance: 0 } });

    return fakeUser;
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

            const fakeRequest = { id: 'r1', ...requestData };
            prismaMock.request.create.mockResolvedValue(fakeRequest);

            const result = await requestService.createRequest(requestData);

            expect(result).toBeDefined();
            expect(result.requesterId).toBe(user.id);
            expect(result.items.length).toBe(2);
            expect(result.status).toBe('pending');
        });
    });
});
