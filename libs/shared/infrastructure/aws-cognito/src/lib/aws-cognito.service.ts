import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsCognitoService {
  private cognito: AWS.CognitoIdentityServiceProvider;
  private readonly logger = new Logger(AwsCognitoService.name);

  constructor() {
    // Initial CognitoIdentityServiceProvider instance
    this.cognito = new AWS.CognitoIdentityServiceProvider({
      region: process.env['AWS_REGION'],
      accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
      secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
    });
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse> {
    const params: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
      ClientId: process.env['COGNITO_CLIENT_ID'] || '',
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'true' },
      ],
    };

    try {
      return await this.cognito.signUp(params).promise();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unknown error occurred');
    }
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> {
    const params: AWS.CognitoIdentityServiceProvider.InitiateAuthRequest = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env['COGNITO_CLIENT_ID'] || '',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    try {
      return await this.cognito.initiateAuth(params).promise();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unknown error occurred');
    }
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> {
    const params: AWS.CognitoIdentityServiceProvider.InitiateAuthRequest = {
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: process.env['COGNITO_CLIENT_ID'] || '',
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    };

    try {
      return await this.cognito.initiateAuth(params).promise();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unknown error occurred');
    }
  }

  async confirmSignUp(email: string): Promise<void> {
    if (!email) {
      // TODO: refactor this to use a custom exception
      throw new BadRequestException('Email is required');
    }

    const params: AWS.CognitoIdentityServiceProvider.AdminConfirmSignUpRequest =
      {
        UserPoolId: process.env['COGNITO_USER_POOL_ID'] || '',
        Username: email,
        // ConfirmationCode: confirmationCode, // If using adminConfirmSignUp is appropriate
      };

    try {
      await this.cognito.adminConfirmSignUp(params).promise();
    } catch (error: unknown) {
      // TODO: refactor this to use a custom exception
      if (error instanceof Error) {
        switch (error.name) {
          case 'UserNotFoundException':
            throw new NotFoundException('User not found');
          case 'NotAuthorizedException':
            throw new UnauthorizedException('Not authorized to confirm user');
          default:
            this.logger.error(error);
            throw new InternalServerErrorException('Failed to confirm user');
        }
      }
      throw new InternalServerErrorException('Failed to confirm user');
    }
  }
}
