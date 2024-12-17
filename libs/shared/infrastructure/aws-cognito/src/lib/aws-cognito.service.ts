import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsCognitoService {
  // private readonly configService: ConfigService;
  private cognito: AWS.CognitoIdentityServiceProvider;

  constructor(private readonly configService: ConfigService) {
    const awsConfig = this.configService.get('aws');

    // Initial CognitoIdentityServiceProvider instance
    this.cognito = new AWS.CognitoIdentityServiceProvider({
      region: awsConfig.region,
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
    });
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse> {
    const awsConfig = this.configService.get('aws');
    const params: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
      ClientId: awsConfig.cognitoClientId,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        // { Name: 'email_verified', Value: 'true' }, // TODO: add this once we have a verification process
      ],
    };

    return await this.cognito.signUp(params).promise();
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> {
    const awsConfig = this.configService.get('aws');
    const params: AWS.CognitoIdentityServiceProvider.InitiateAuthRequest = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: awsConfig.cognitoClientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    return await this.cognito.initiateAuth(params).promise();
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> {
    const awsConfig = this.configService.get('aws');
    const params: AWS.CognitoIdentityServiceProvider.InitiateAuthRequest = {
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: awsConfig.cognitoClientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    };

    return await this.cognito.initiateAuth(params).promise();
  }

  async confirmSignUp(email: string, confirmationCode: string): Promise<void> {
    const awsConfig = this.configService.get('aws');
    const params: AWS.CognitoIdentityServiceProvider.ConfirmSignUpRequest = {
      ClientId: awsConfig.cognitoClientId,
      Username: email,
      ConfirmationCode: confirmationCode,
    };

    await this.cognito.confirmSignUp(params).promise();
  }
}
