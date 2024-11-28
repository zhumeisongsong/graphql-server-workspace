import { Test, TestingModule } from '@nestjs/testing';
import { AwsCognitoService } from './aws-cognito.service';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

describe('AwsCognitoService', () => {
  let service: AwsCognitoService;
  let cognitoProvider: CognitoIdentityServiceProvider;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AwsCognitoService,
        {
          provide: CognitoIdentityServiceProvider,
          useValue: {
            signUp: jest.fn(),
            initiateAuth: jest.fn(),
            adminConfirmSignUp: jest.fn(),
            adminGetUser: jest.fn(),
            adminDeleteUser: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AwsCognitoService>(AwsCognitoService);
    cognitoProvider = module.get<CognitoIdentityServiceProvider>(
      CognitoIdentityServiceProvider,
    );
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should successfully sign up a user', async () => {
      const mockResponse = {
        UserSub: 'test-user-sub',
        UserConfirmed: false,
      };

      (cognitoProvider.signUp as jest.Mock).mockImplementation(() => ({
        promise: () => Promise.resolve(mockResponse),
      }));

      const result = await service.signUp('test@email.com', 'password123');

      expect(result).toEqual(mockResponse);
      expect(cognitoProvider.signUp).toHaveBeenCalled();
    });

    it('should throw an error if sign up fails', async () => {
      (cognitoProvider.signUp as jest.Mock).mockImplementation(() => ({
        promise: () => Promise.reject(new Error('Sign up failed')),
      }));

      await expect(
        service.signUp('test@email.com', 'password123'),
      ).rejects.toThrow('Sign up failed');
    });
  });

  describe('signIn', () => {
    it('should successfully sign in a user', async () => {
      const mockResponse = {
        AuthenticationResult: {
          AccessToken: 'test-access-token',
          IdToken: 'test-id-token',
          RefreshToken: 'test-refresh-token',
        },
      };

      (cognitoProvider.initiateAuth as jest.Mock).mockImplementation(() => ({
        promise: () => Promise.resolve(mockResponse),
      }));

      const result = await service.signIn('test@email.com', 'password123');

      expect(result).toEqual(mockResponse);
      expect(cognitoProvider.initiateAuth).toHaveBeenCalled();
    });

    it('should throw an error if sign in fails', async () => {
      (cognitoProvider.initiateAuth as jest.Mock).mockImplementation(() => ({
        promise: () => Promise.reject(new Error('Sign in failed')),
      }));

      await expect(
        service.signIn('test@email.com', 'password123'),
      ).rejects.toThrow('Sign in failed');
    });
  });

  describe('confirmSignUp', () => {
    it('should successfully confirm user signup', async () => {
      (cognitoProvider.adminConfirmSignUp as jest.Mock).mockImplementation(
        () => ({
          promise: () => Promise.resolve({}),
        }),
      );

      await service.confirmSignUp('test@email.com');

      expect(cognitoProvider.adminConfirmSignUp).toHaveBeenCalled();
    });

    it('should throw an error if confirmation fails', async () => {
      (cognitoProvider.adminConfirmSignUp as jest.Mock).mockImplementation(
        () => ({
          promise: () => Promise.reject(new Error('Confirmation failed')),
        }),
      );

      await expect(service.confirmSignUp('test@email.com')).rejects.toThrow(
        'Confirmation failed',
      );
    });
  });

  describe('refreshToken', () => {
    it('should successfully refresh token', async () => {
      const mockResponse = {
        AuthenticationResult: {
          AccessToken: 'newAccessToken',
          IdToken: 'newIdToken',
          RefreshToken: 'newRefreshToken',
        },
      };

      (cognitoProvider.initiateAuth as jest.Mock).mockImplementation(() => ({
        promise: () => Promise.resolve(mockResponse),
      }));

      const result = await service.refreshToken('oldRefreshToken');

      expect(result).toEqual(mockResponse);
      expect(cognitoProvider.initiateAuth).toHaveBeenCalledWith({
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: expect.any(String),
        AuthParameters: {
          REFRESH_TOKEN: 'oldRefreshToken',
        },
      });
    });

    it('should throw an error if refresh token fails', async () => {
      (cognitoProvider.initiateAuth as jest.Mock).mockImplementation(() => ({
        promise: () => Promise.reject(new Error('Token refresh failed')),
      }));

      await expect(service.refreshToken('oldRefreshToken')).rejects.toThrow(
        'Token refresh failed',
      );
    });
  });
});
