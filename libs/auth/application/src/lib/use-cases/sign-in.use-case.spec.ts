import { Test } from '@nestjs/testing';
import { SignInUseCase } from './sign-in.use-case';
import { AUTH_SERVICE } from '@auth/domain';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('SignInUseCase', () => {
  let useCase: SignInUseCase;
  let authService: { signIn: jest.Mock };
  let jwtService: { signAsync: jest.Mock };

  beforeEach(async () => {
    authService = {
      signIn: jest.fn(),
    };

    jwtService = {
      signAsync: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        SignInUseCase,
        {
          provide: AUTH_SERVICE,
          useValue: authService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    useCase = moduleRef.get<SignInUseCase>(SignInUseCase);
  });

  it('should successfully sign in and return access token', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const mockToken = 'mock.jwt.token';

    authService.signIn.mockResolvedValue(undefined);
    jwtService.signAsync.mockResolvedValue(mockToken);

    const result = await useCase.execute(email, password);

    expect(authService.signIn).toHaveBeenCalledWith(email, password);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      email: email,
    });
    expect(result).toEqual({ accessToken: mockToken });
  });

  it('should throw UnauthorizedException when auth service fails', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const error = new Error('Auth failed');

    authService.signIn.mockRejectedValue(error);

    await expect(useCase.execute(email, password)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(authService.signIn).toHaveBeenCalledWith(email, password);
  });

  it('should throw UnauthorizedException when JWT signing fails', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    authService.signIn.mockResolvedValue(undefined);
    jwtService.signAsync.mockRejectedValue(new Error('JWT signing failed'));

    await expect(useCase.execute(email, password)).rejects.toThrow(
      UnauthorizedException,
    );
    expect(authService.signIn).toHaveBeenCalledWith(email, password);
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      email: email,
    });
  });
});
