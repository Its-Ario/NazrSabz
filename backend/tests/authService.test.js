import { AuthService } from '../src/services/authService.js';
import { WalletService } from '../src/services/walletService.js';

let authService;
let walletService;

beforeEach(() => {
    authService = new AuthService(global.prismaMock);
    walletService = new WalletService(global.prismaMock);
});

describe('authService', () => {
    describe('registerUser', () => {
        const userData = {
            name: 'n',
            username: 'u_test',
            password: 'p',
            email: 'a@b.com',
        };

        it('should create and save a new user successfully', async () => {
            const fakeUser = { id: '1', ...userData, tokenVersion: 0 };

            global.prismaMock.$transaction.mockImplementation(async (cb) => {
                const tx = global.prismaMock;
                return cb(tx);
            });

            global.prismaMock.user.findFirst.mockResolvedValue(null);
            global.prismaMock.user.create.mockResolvedValue(fakeUser);
            global.prismaMock.wallet.create.mockResolvedValue({ userId: '1', balance: 0 });
            global.prismaMock.wallet.findUnique.mockResolvedValue({ userId: '1', balance: 0 });

            const result = await authService.registerUser(userData);

            expect(result).not.toHaveProperty('passwordHash');
            expect(result.username).toBe(userData.username);

            const wallet = await walletService.getWalletByUser(result.id);
            expect(wallet).toBeDefined();
            expect(wallet.balance).toBe(0);
        });
        it('should create and save a new user successfully', async () => {
            const fakeUser = { id: '1', ...userData, tokenVersion: 0 };

            global.prismaMock.$transaction.mockImplementation(async (cb) => {
                const tx = global.prismaMock;
                return cb(tx);
            });

            global.prismaMock.user.findFirst.mockResolvedValue(null);
            global.prismaMock.user.create.mockResolvedValue(fakeUser);
            global.prismaMock.wallet.create.mockResolvedValue({ userId: '1', balance: 0 });
            global.prismaMock.wallet.findUnique.mockResolvedValue({ userId: '1', balance: 0 });

            const result = await authService.registerUser(userData);

            expect(result).not.toHaveProperty('passwordHash');
            expect(result.username).toBe(userData.username);

            const wallet = await walletService.getWalletByUser(result.id);
            expect(wallet).toBeDefined();
            expect(wallet.balance).toBe(0);
        });

        it('should throw an error if the user already exists', async () => {
            global.prismaMock.user.findFirst.mockResolvedValue({ id: '1', ...userData });

            await expect(authService.registerUser(userData)).rejects.toThrow(
                'User with this email or username already exists.'
            );
        });
    });
});
