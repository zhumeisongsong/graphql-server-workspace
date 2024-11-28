import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsCognitoService {
  private cognito: AWS.CognitoIdentityServiceProvider;

  constructor() {
    AWS.config.update({
      region: process.env['AWS_REGION'],
      accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
      secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
    });

    // Initial CognitoIdentityServiceProvider instance
    this.cognito = new AWS.CognitoIdentityServiceProvider();
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
    const params: AWS.CognitoIdentityServiceProvider.AdminConfirmSignUpRequest =
      {
        UserPoolId: process.env['COGNITO_USER_POOL_ID'] || '',
        Username: email,
      };

    try {
      await this.cognito.adminConfirmSignUp(params).promise();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
