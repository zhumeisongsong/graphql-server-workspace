import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AwsCognitoService } from '@shared/infrastructure-aws-cognito';
import { UsersService } from '@users/application';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let awsCognitoService: jest.Mocked<AwsCognitoService>;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AwsCognitoService,
          useValue: {
            signIn: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
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

    service = module.get<AuthService>(AuthService);
    awsCognitoService = module.get(AwsCognitoService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const userId = '123';
    const user = { id: userId, email, firstName: null, lastName: null };

    // it('should throw UnauthorizedException when AWS Cognito sign in fails', async () => {
    //   const error = new Error('Invalid credentials');
    //   awsCognitoService.signIn.mockRejectedValue(error);

    //   await expect(service.signIn(email, password)).rejects.toThrow(
    //     UnauthorizedException,
    //   );
    // });

    it('should throw UnauthorizedException when JWT signing fails', async () => {
      const error = new Error('JWT signing failed');
      awsCognitoService.signIn.mockResolvedValue(undefined);
      usersService.findByEmail.mockResolvedValue(user);
      jwtService.signAsync.mockRejectedValue(error);

      await expect(service.signIn(email, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
