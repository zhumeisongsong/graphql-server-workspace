import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access token when credentials are valid', async () => {
      const mockEmail = 'test@example.com';
      const mockPassword = 'password123';
      const mockUser = {
        id: '123',
        email: mockEmail,
        firstName: 'John',
        lastName: 'Doe',
      };
      const mockAccessToken = 'mock.jwt.token';

      jest.spyOn(service['awsCognitoService'], 'signIn').mockResolvedValue({});
      jest
        .spyOn(service['usersService'], 'findByEmail')
        .mockResolvedValue(mockUser);
      jest
        .spyOn(service['jwtService'], 'signAsync')
        .mockResolvedValue(mockAccessToken);

      const result = await service.signIn(mockEmail, mockPassword);

      expect(result).toEqual({ accessToken: mockAccessToken });
      expect(service['awsCognitoService'].signIn).toHaveBeenCalledWith(
        mockEmail,
        mockPassword,
      );
      expect(service['usersService'].findByEmail).toHaveBeenCalledWith(
        mockEmail,
      );
      expect(service['jwtService'].signAsync).toHaveBeenCalledWith({
        sub: mockUser.id,
        username: mockUser.email,
      });
    });

    it('should throw UnauthorizedException when credentials are invalid', async () => {
      const mockEmail = 'test@example.com';
      const mockPassword = 'wrongpassword';

      jest
        .spyOn(service['awsCognitoService'], 'signIn')
        .mockRejectedValue(new Error('Invalid credentials'));

      await expect(service.signIn(mockEmail, mockPassword)).rejects.toThrow(
        'Unauthorized',
      );
    });
  });
});
