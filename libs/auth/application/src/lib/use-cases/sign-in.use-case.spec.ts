import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AwsCognitoService } from '@shared/infrastructure-aws-cognito';
import { SignInUseCase } from './sign-in.use-case';

describe('SignInUseCase', () => {
  let signInUseCase: SignInUseCase;
  let awsCognitoService: AwsCognitoService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SignInUseCase,
        {
          provide: AwsCognitoService,
          useValue: {
            signIn: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    signInUseCase = moduleRef.get<SignInUseCase>(SignInUseCase);
    awsCognitoService = moduleRef.get<AwsCognitoService>(AwsCognitoService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  describe('execute', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const mockAccessToken = 'mock.access.token';

    it('should successfully sign in and return access token', async () => {
      jest.spyOn(awsCognitoService, 'signIn').mockResolvedValue(undefined);
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(mockAccessToken);

      const result = await signInUseCase.execute(email, password);

      expect(awsCognitoService.signIn).toHaveBeenCalledWith(email, password);
      expect(jwtService.signAsync).toHaveBeenCalledWith({ email });
      expect(result).toEqual({ accessToken: mockAccessToken });
    });

    it('should throw UnauthorizedException when AWS Cognito sign in fails', async () => {
      const error = new Error('Invalid credentials');
      jest.spyOn(awsCognitoService, 'signIn').mockRejectedValue(error);

      await expect(signInUseCase.execute(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException when JWT signing fails', async () => {
      jest.spyOn(awsCognitoService, 'signIn').mockResolvedValue(undefined);
      jest.spyOn(jwtService, 'signAsync').mockRejectedValue(new Error());

      await expect(signInUseCase.execute(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
