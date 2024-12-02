import { Injectable, Logger } from '@nestjs/common';
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
      ClientId: process.env['COGNITO_CLIENT_ID'] ?? '', // TODO: add this to the config
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        // { Name: 'email_verified', Value: 'true' }, // TODO: add this once we have a verification process
      ],
    };

    try {
      return await this.cognito.signUp(params).promise();
    } catch (error) {
      this.logger.error(error);
      throw error;
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
    } catch (error) {
      this.logger.error(error);
      throw error;
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
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async confirmSignUp(email: string, confirmationCode: string): Promise<void> {
    const params: AWS.CognitoIdentityServiceProvider.ConfirmSignUpRequest = {
      ClientId: process.env['COGNITO_CLIENT_ID'] || '',
      Username: email,
      ConfirmationCode: confirmationCode,
    };

    try {
      await this.cognito.confirmSignUp(params).promise();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
