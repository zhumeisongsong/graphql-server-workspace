import { Test, TestingModule } from '@nestjs/testing';
import { SignInUseCase } from '@auth/application';
import { UnauthorizedException } from '@nestjs/common';

import { AuthResolver } from './auth.resolver';
import { SignInInputDto } from '../dto/sign-in-input.dto';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let signInUseCase: SignInUseCase;

  const mockSignInUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: SignInUseCase,
          useValue: mockSignInUseCase,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    signInUseCase = module.get<SignInUseCase>(SignInUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    const signInInput: SignInInputDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const mockResponse = {
      accessToken: 'mock-access-token',
    };

    it('should successfully sign in a user', async () => {
      mockSignInUseCase.execute.mockResolvedValue(mockResponse);

      const result = await resolver.signIn(signInInput);

      expect(result).toEqual(mockResponse);
      expect(signInUseCase.execute).toHaveBeenCalledWith(
        signInInput.email,
        signInInput.password,
      );
    });

    it('should throw UnauthorizedException when sign in fails', async () => {
      mockSignInUseCase.execute.mockRejectedValue(
        new UnauthorizedException('Invalid credentials'),
      );

      await expect(resolver.signIn(signInInput)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(signInUseCase.execute).toHaveBeenCalledWith(
        signInInput.email,
        signInInput.password,
      );
    });
  });
});
