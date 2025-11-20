import { prismaMock } from './__mocks__/prismaClient.js';
import { RequestService } from '../src/services/requestService.js';
import userService from '../src/services/userService.js';

let requestService;

beforeEach(() => {
    requestService = new RequestService(prismaMock);

    if (prismaMock.request) {
        Object.keys(prismaMock.request).forEach((key) => {
            if (prismaMock.request[key]?.mockReset) {
                prismaMock.request[key].mockReset();
            }
        });
    }

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

        it('should handle errors during request creation', async () => {
            const requestData = {
                requesterId: '1',
                items: [],
            };

            prismaMock.request.create.mockRejectedValue(new Error('Database error'));

            await expect(requestService.createRequest(requestData)).rejects.toThrow(
                'Database error'
            );
        });
    });

    describe('getRequestById', () => {
        it('should return a request with requester and collector details', async () => {
            const mockRequest = {
                id: 'r1',
                requesterId: '1',
                collectorId: '2',
                items: [{ name: 'Plastic', weight: 5 }],
                status: 'PENDING',
                requester: { id: '1', name: 'John Doe', phone: '1234567890' },
                collector: { id: '2', name: 'Jane Smith', phone: '0987654321' },
            };

            prismaMock.request.findUnique.mockResolvedValue(mockRequest);

            const result = await requestService.getRequestById('r1');

            expect(result).toBeDefined();
            expect(result.id).toBe('r1');
            expect(result.requester.name).toBe('John Doe');
            expect(result.collector.name).toBe('Jane Smith');
            expect(prismaMock.request.findUnique).toHaveBeenCalledWith({
                where: { id: 'r1' },
                include: {
                    requester: { select: { id: true, name: true, phone: true } },
                    collector: { select: { id: true, name: true, phone: true } },
                },
            });
        });

        it('should throw error when request is not found', async () => {
            prismaMock.request.findUnique.mockResolvedValue(null);

            await expect(requestService.getRequestById('nonexistent')).rejects.toThrow(
                'Request not found'
            );
        });

        it('should handle database errors', async () => {
            prismaMock.request.findUnique.mockRejectedValue(new Error('Database error'));

            await expect(requestService.getRequestById('r1')).rejects.toThrow('Database error');
        });
    });

    describe('updateStatus', () => {
        it('should update request status successfully', async () => {
            const mockUpdated = {
                status: 'COMPLETED',
                requesterId: '1',
                collectorId: '2',
            };

            prismaMock.request.update.mockResolvedValue(mockUpdated);

            const result = await requestService.updateStatus('r1', 'completed');

            expect(result.status).toBe('COMPLETED');
            expect(prismaMock.request.update).toHaveBeenCalledWith({
                where: { id: 'r1' },
                data: { status: 'COMPLETED' },
                select: {
                    status: true,
                    requesterId: true,
                    collectorId: true,
                },
            });
        });

        it('should throw error for invalid status', async () => {
            await expect(requestService.updateStatus('r1', 'invalid')).rejects.toThrow(
                'Invalid Status'
            );
        });

        it('should handle status case-insensitively', async () => {
            const mockUpdated = {
                status: 'PENDING',
                requesterId: '1',
                collectorId: '2',
            };

            prismaMock.request.update.mockResolvedValue(mockUpdated);

            await requestService.updateStatus('r1', 'pending');
            expect(prismaMock.request.update).toHaveBeenCalledWith(
                expect.objectContaining({
                    data: { status: 'PENDING' },
                })
            );
        });

        it('should handle all allowed statuses', async () => {
            const statuses = ['PENDING', 'COMPLETED', 'CANCELED'];

            for (const status of statuses) {
                prismaMock.request.update.mockResolvedValue({
                    status,
                    requesterId: '1',
                    collectorId: '2',
                });
                const result = await requestService.updateStatus('r1', status.toLowerCase());
                expect(result.status).toBe(status);
            }
        });

        it('should handle database errors during update', async () => {
            prismaMock.request.update.mockRejectedValue(new Error('Database error'));

            await expect(requestService.updateStatus('r1', 'completed')).rejects.toThrow(
                'Database error'
            );
        });
    });

    describe('updateCollector', () => {
        it('should update collector successfully', async () => {
            const mockCollector = { id: '2', name: 'Jane Smith' };
            const mockUpdated = {
                status: 'PENDING',
            };

            // Mock userService.getUserProfile
            const originalGetUserProfile = userService.getUserProfile;
            userService.getUserProfile = async (id) => {
                if (id === '2') return mockCollector;
                throw new Error('User not found');
            };

            prismaMock.request.update.mockResolvedValue(mockUpdated);

            const result = await requestService.updateCollector('r1', '2');

            expect(prismaMock.request.update).toHaveBeenCalledWith({
                where: { id: 'r1' },
                data: { collectorId: '2' },
                include: {
                    requester: true,
                    collector: true,
                },
                select: {
                    status: true,
                },
            });
            expect(result.status).toBe('PENDING');

            // Restore original
            userService.getUserProfile = originalGetUserProfile;
        });

        it('should throw error if collector does not exist', async () => {
            const originalGetUserProfile = userService.getUserProfile;
            userService.getUserProfile = async () => {
                throw new Error('User not found');
            };

            await expect(requestService.updateCollector('r1', 'nonexistent')).rejects.toThrow(
                'User not found'
            );

            userService.getUserProfile = originalGetUserProfile;
        });

        it('should handle database errors during update', async () => {
            const originalGetUserProfile = userService.getUserProfile;
            userService.getUserProfile = async () => ({ id: '2', name: 'Jane' });

            prismaMock.request.update.mockRejectedValue(new Error('Database error'));

            await expect(requestService.updateCollector('r1', '2')).rejects.toThrow(
                'Database error'
            );

            userService.getUserProfile = originalGetUserProfile;
        });
    });

    describe('getAllRequests', () => {
        it('should return paginated requests', async () => {
            const mockRequests = [
                { id: 'r1', status: 'PENDING' },
                { id: 'r2', status: 'COMPLETED' },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);
            prismaMock.request.count.mockResolvedValue(20);

            const result = await requestService.getAllRequests({ page: 1, limit: 10 });

            expect(result.requests).toEqual(mockRequests);
            expect(result.pagination).toEqual({
                page: 1,
                limit: 10,
                total: 20,
                pages: 2,
            });
            expect(prismaMock.request.findMany).toHaveBeenCalledWith({
                skip: 0,
                take: 10,
                include: { collector: true, requester: true },
                orderBy: { createdAt: 'desc' },
            });
        });

        it('should handle page 2 correctly', async () => {
            const mockRequests = [{ id: 'r3', status: 'PENDING' }];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);
            prismaMock.request.count.mockResolvedValue(25);

            const result = await requestService.getAllRequests({ page: 2, limit: 10 });

            expect(prismaMock.request.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    skip: 10,
                    take: 10,
                })
            );
            expect(result.pagination.pages).toBe(3);
        });

        it('should use default pagination values', async () => {
            prismaMock.request.findMany.mockResolvedValue([]);
            prismaMock.request.count.mockResolvedValue(0);

            const result = await requestService.getAllRequests();

            expect(result.pagination).toEqual({
                page: 1,
                limit: 10,
                total: 0,
                pages: 0,
            });
        });

        it('should handle empty results', async () => {
            prismaMock.request.findMany.mockResolvedValue([]);
            prismaMock.request.count.mockResolvedValue(0);

            const result = await requestService.getAllRequests({ page: 1, limit: 10 });

            expect(result.requests).toEqual([]);
            expect(result.pagination.total).toBe(0);
        });
    });

    describe('getRequestsByRequester', () => {
        it('should return requests for a specific requester', async () => {
            const mockRequests = [
                { id: 'r1', requesterId: '1', status: 'PENDING' },
                { id: 'r2', requesterId: '1', status: 'COMPLETED' },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);
            prismaMock.request.count.mockResolvedValue(2);

            const result = await requestService.getRequestsByRequester('1', { page: 1, limit: 10 });

            expect(result.requests).toEqual(mockRequests);
            expect(prismaMock.request.findMany).toHaveBeenCalledWith({
                where: { requesterId: '1' },
                skip: 0,
                take: 10,
                include: { collector: true, requester: true },
                orderBy: { createdAt: 'desc' },
            });
        });

        it('should filter by status when provided', async () => {
            const mockRequests = [{ id: 'r1', requesterId: '1', status: 'COMPLETED' }];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);
            prismaMock.request.count.mockResolvedValue(1);

            await requestService.getRequestsByRequester('1', { status: 'completed' });

            expect(prismaMock.request.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: { requesterId: '1', status: 'COMPLETED' },
                })
            );
        });

        it('should handle pagination correctly', async () => {
            prismaMock.request.findMany.mockResolvedValue([]);
            prismaMock.request.count.mockResolvedValue(15);

            const result = await requestService.getRequestsByRequester('1', {
                page: 2,
                limit: 5,
            });

            expect(prismaMock.request.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    skip: 5,
                    take: 5,
                })
            );
            expect(result.pagination.pages).toBe(3);
        });

        it('should use default values when no options provided', async () => {
            prismaMock.request.findMany.mockResolvedValue([]);
            prismaMock.request.count.mockResolvedValue(0);

            const result = await requestService.getRequestsByRequester('1');

            expect(result.pagination).toEqual({
                page: 1,
                limit: 10,
                total: 0,
                pages: 0,
            });
        });
    });

    describe('getRequestsByCollector', () => {
        it('should return requests for a specific collector', async () => {
            const mockRequests = [
                { id: 'r1', collectorId: '2', status: 'PENDING' },
                { id: 'r2', collectorId: '2', status: 'COMPLETED' },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);
            prismaMock.request.count.mockResolvedValue(2);

            const result = await requestService.getRequestsByCollector('2', { page: 1, limit: 10 });

            expect(result.requests).toEqual(mockRequests);
            expect(prismaMock.request.findMany).toHaveBeenCalledWith({
                where: { collectorId: '2' },
                skip: 0,
                take: 10,
                include: { collector: true, requester: true },
                orderBy: { createdAt: 'desc' },
            });
        });

        it('should filter by status when provided', async () => {
            const mockRequests = [{ id: 'r1', collectorId: '2', status: 'PENDING' }];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);
            prismaMock.request.count.mockResolvedValue(1);

            await requestService.getRequestsByCollector('2', { status: 'pending' });

            expect(prismaMock.request.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: { collectorId: '2', status: 'PENDING' },
                })
            );
        });

        it('should handle multiple pages', async () => {
            prismaMock.request.findMany.mockResolvedValue([]);
            prismaMock.request.count.mockResolvedValue(30);

            const result = await requestService.getRequestsByCollector('2', {
                page: 3,
                limit: 10,
            });

            expect(result.pagination.pages).toBe(3);
            expect(prismaMock.request.findMany).toHaveBeenCalledWith(
                expect.objectContaining({
                    skip: 20,
                })
            );
        });
    });

    describe('getRequestStats', () => {
        it('should return stats for requester', async () => {
            const mockGrouped = [
                { status: 'PENDING', _count: { _all: 5 } },
                { status: 'COMPLETED', _count: { _all: 10 } },
                { status: 'CANCELED', _count: { _all: 2 } },
            ];

            prismaMock.request.groupBy.mockResolvedValue(mockGrouped);

            const result = await requestService.getRequestStats('1', 'requester');

            expect(result).toEqual({
                total: 17,
                PENDING: 5,
                COMPLETED: 10,
                CANCELED: 2,
            });
            expect(prismaMock.request.groupBy).toHaveBeenCalledWith({
                by: ['status'],
                where: { requesterId: '1' },
                _count: { _all: true },
            });
        });

        it('should return stats for collector', async () => {
            const mockGrouped = [
                { status: 'COMPLETED', _count: { _all: 15 } },
                { status: 'PENDING', _count: { _all: 3 } },
            ];

            prismaMock.request.groupBy.mockResolvedValue(mockGrouped);

            const result = await requestService.getRequestStats('2', 'collector');

            expect(result).toEqual({
                total: 18,
                PENDING: 3,
                COMPLETED: 15,
                CANCELED: 0,
            });
            expect(prismaMock.request.groupBy).toHaveBeenCalledWith({
                by: ['status'],
                where: { collectorId: '2' },
                _count: { _all: true },
            });
        });

        it('should return all zeros when no requests exist', async () => {
            prismaMock.request.groupBy.mockResolvedValue([]);

            const result = await requestService.getRequestStats('1', 'requester');

            expect(result).toEqual({
                total: 0,
                PENDING: 0,
                COMPLETED: 0,
                CANCELED: 0,
            });
        });

        it('should handle partial status results', async () => {
            const mockGrouped = [{ status: 'PENDING', _count: { _all: 5 } }];

            prismaMock.request.groupBy.mockResolvedValue(mockGrouped);

            const result = await requestService.getRequestStats('1', 'requester');

            expect(result).toEqual({
                total: 5,
                PENDING: 5,
                COMPLETED: 0,
                CANCELED: 0,
            });
        });
    });

    describe('getTotalCollectedWeight', () => {
        it('should calculate total weight from array items', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'plastic', weight: 5.5 },
                        { type: 'paper', weight: 3.2 },
                    ],
                },
                {
                    items: [{ type: 'glass', weight: 2.1 }],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getTotalCollectedWeight('2');

            expect(result).toBe(10.8);
            expect(prismaMock.request.findMany).toHaveBeenCalledWith({
                where: {
                    collectorId: '2',
                    status: 'COMPLETED',
                },
                select: { items: true },
            });
        });

        it('should calculate total weight from object items', async () => {
            const mockRequests = [
                {
                    items: {
                        plastic: 5,
                        paper: 3,
                        glass: 2,
                    },
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getTotalCollectedWeight('2');

            expect(result).toBe(10);
        });

        it('should handle mixed array and object items', async () => {
            const mockRequests = [
                {
                    items: [{ type: 'plastic', weight: 5.5 }],
                },
                {
                    items: {
                        paper: 3.5,
                    },
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getTotalCollectedWeight('2');

            expect(result).toBe(9);
        });

        it('should ignore invalid weight values', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'plastic', weight: 5 },
                        { type: 'paper', weight: 'invalid' },
                        { type: 'glass' }, // no weight
                    ],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getTotalCollectedWeight('2');

            expect(result).toBe(5);
        });

        it('should return 0 when no completed requests exist', async () => {
            prismaMock.request.findMany.mockResolvedValue([]);

            const result = await requestService.getTotalCollectedWeight('2');

            expect(result).toBe(0);
        });

        it('should handle null or undefined items', async () => {
            const mockRequests = [
                { items: null },
                { items: undefined },
                { items: [{ type: 'plastic', weight: 5 }] },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getTotalCollectedWeight('2');

            expect(result).toBe(5);
        });

        it('should throw error on database failure', async () => {
            prismaMock.request.findMany.mockRejectedValue(new Error('Database error'));

            await expect(requestService.getTotalCollectedWeight('2')).rejects.toThrow(
                'Database error'
            );
        });

        it('should round to 2 decimal places', async () => {
            const mockRequests = [
                {
                    items: [{ type: 'plastic', weight: 5.555 }],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getTotalCollectedWeight('2');

            expect(result).toBe(5.55);
        });
    });

    describe('getTotalRequestedWeight', () => {
        it('should calculate total requested weight from array items', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'plastic', weight: 5.5 },
                        { type: 'paper', weight: 3.2 },
                    ],
                },
                {
                    items: [{ type: 'glass', weight: 2.1 }],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getTotalRequestedWeight('1');

            expect(result).toBe(10.8);
            expect(prismaMock.request.findMany).toHaveBeenCalledWith({
                where: { requesterId: '1' },
                select: { items: true },
            });
        });

        it('should handle string weights', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'plastic', weight: '5.5' },
                        { type: 'paper', weight: '3.2' },
                    ],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getTotalRequestedWeight('1');

            expect(result).toBe(8.7);
        });

        it('should handle object-style items', async () => {
            const mockRequests = [
                {
                    items: {
                        item1: { type: 'plastic', weight: 5 },
                        item2: { type: 'paper', weight: 3 },
                    },
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getTotalRequestedWeight('1');

            expect(result).toBe(8);
        });

        it('should ignore invalid items', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'plastic', weight: 5 },
                        { type: 'paper' }, // no weight
                        null,
                        { type: 'glass', weight: 'invalid' },
                    ],
                },
                {
                    items: null,
                },
                {
                    items: 'invalid',
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getTotalRequestedWeight('1');

            expect(result).toBe(5);
        });

        it('should return 0 when no requests exist', async () => {
            prismaMock.request.findMany.mockResolvedValue([]);

            const result = await requestService.getTotalRequestedWeight('1');

            expect(result).toBe(0);
        });

        it('should handle items without weight property', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'plastic', weight: 5 },
                        { type: 'paper', quantity: 10 }, // no weight
                    ],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getTotalRequestedWeight('1');

            expect(result).toBe(5);
        });

        it('should throw error on database failure', async () => {
            prismaMock.request.findMany.mockRejectedValue(new Error('Database error'));

            await expect(requestService.getTotalRequestedWeight('1')).rejects.toThrow(
                'Database error'
            );
        });

        it('should round to 2 decimal places', async () => {
            const mockRequests = [
                {
                    items: [{ type: 'plastic', weight: 5.555 }],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getTotalRequestedWeight('1');

            expect(result).toBe(5.55);
        });
    });

    describe('getWeightBreakdownByMaterial', () => {
        it('should calculate weight breakdown by material type', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'plastic', weight: 5.5 },
                        { type: 'paper', weight: 3.2 },
                        { type: 'glass', weight: 2.1 },
                    ],
                },
                {
                    items: [
                        { type: 'plastic', weight: 4.5 },
                        { type: 'metal', weight: 1.5 },
                    ],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getWeightBreakdownByMaterial('1');

            expect(result).toEqual({
                plastic: 10,
                paper: 3.2,
                glass: 2.1,
                metal: 1.5,
            });
        });

        it('should handle case-insensitive material types', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'PLASTIC', weight: 5 },
                        { type: 'Plastic', weight: 3 },
                        { type: 'plastic', weight: 2 },
                    ],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getWeightBreakdownByMaterial('1');

            expect(result.plastic).toBe(10);
        });

        it('should handle string weights', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'plastic', weight: '5.5' },
                        { type: 'paper', weight: '3.2' },
                    ],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getWeightBreakdownByMaterial('1');

            expect(result.plastic).toBe(5.5);
            expect(result.paper).toBe(3.2);
        });

        it('should handle object-style items', async () => {
            const mockRequests = [
                {
                    items: {
                        item1: { type: 'plastic', weight: 5 },
                        item2: { type: 'paper', weight: 3 },
                    },
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getWeightBreakdownByMaterial('1');

            expect(result.plastic).toBe(5);
            expect(result.paper).toBe(3);
        });

        it('should ignore unknown material types', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'plastic', weight: 5 },
                        { type: 'unknown', weight: 10 },
                        { type: 'other', weight: 7 },
                    ],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getWeightBreakdownByMaterial('1');

            expect(result.plastic).toBe(5);
            expect(result.paper).toBe(0);
            expect(result.glass).toBe(0);
            expect(result.metal).toBe(0);
        });

        it('should ignore invalid items', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'plastic', weight: 5 },
                        { weight: 10 }, // no type
                        null,
                        { type: 'paper', weight: 'invalid' },
                        { type: 'glass' }, // no weight
                    ],
                },
                {
                    items: null,
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getWeightBreakdownByMaterial('1');

            expect(result).toEqual({
                plastic: 5,
                paper: 0,
                glass: 0,
                metal: 0,
            });
        });

        it('should return all zeros when no requests exist', async () => {
            prismaMock.request.findMany.mockResolvedValue([]);

            const result = await requestService.getWeightBreakdownByMaterial('1');

            expect(result).toEqual({
                plastic: 0,
                paper: 0,
                glass: 0,
                metal: 0,
            });
        });

        it('should round results to 2 decimal places', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'plastic', weight: 5.555 },
                        { type: 'paper', weight: 3.333 },
                    ],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getWeightBreakdownByMaterial('1');

            expect(result.plastic).toBe(5.55);
            expect(result.paper).toBe(3.33);
        });

        it('should handle empty items arrays', async () => {
            const mockRequests = [
                {
                    items: [],
                },
                {
                    items: [{ type: 'plastic', weight: 5 }],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getWeightBreakdownByMaterial('1');

            expect(result.plastic).toBe(5);
        });

        it('should throw error on database failure', async () => {
            prismaMock.request.findMany.mockRejectedValue(new Error('Database error'));

            await expect(requestService.getWeightBreakdownByMaterial('1')).rejects.toThrow(
                'Database error'
            );
        });

        it('should handle NaN weight values', async () => {
            const mockRequests = [
                {
                    items: [
                        { type: 'plastic', weight: 5 },
                        { type: 'paper', weight: NaN },
                    ],
                },
            ];

            prismaMock.request.findMany.mockResolvedValue(mockRequests);

            const result = await requestService.getWeightBreakdownByMaterial('1');

            expect(result.plastic).toBe(5);
            expect(result.paper).toBe(0);
        });
    });
});
