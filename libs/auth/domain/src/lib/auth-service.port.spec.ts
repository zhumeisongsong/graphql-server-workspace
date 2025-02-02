import { AuthService } from './auth-service.port';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = {
      signIn: jest.fn(),
    };
  });

  describe('signIn', () => {
    const email = 'test@example.com';
    const password = 'password123';

    it('should call signIn with email and password', async () => {
      await service.signIn(email, password);
      expect(service.signIn).toHaveBeenCalledWith(email, password);
    });

    it('should return void when successful', async () => {
      (service.signIn as jest.Mock).mockResolvedValue(undefined);
      const result = await service.signIn(email, password);
      expect(result).toBeUndefined();
    });

    it('should throw error when signIn fails', async () => {
      const error = new Error('Auth failed');
      (service.signIn as jest.Mock).mockRejectedValue(error);
      
      await expect(service.signIn(email, password)).rejects.toThrow(error);
    });
  });
});
