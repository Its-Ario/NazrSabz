describe('RequestService', () => {
    describe('createRequest', () => {
        const userData = {
            name: 'n',
            username: 'u',
            password: 'p',
            email: 'a@b.com',
        };
        const requestData = {};
        it('should create and save a new request successfully', async () => {
            const result = await authService.registerUser(userData);

            expect(result).not.toHaveProperty('password');
            expect(result).not.toHaveProperty('passwordHash');
            expect(result.username).toBe(userData.username);
        });

        it('should throw an error if the user already exists', async () => {
            await createUser();

            await expect(authService.registerUser(userData)).rejects.toThrow(
                'User with this email or username already exists.'
            );
        });
    });
});
