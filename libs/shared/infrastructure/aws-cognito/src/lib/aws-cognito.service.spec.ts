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
});
