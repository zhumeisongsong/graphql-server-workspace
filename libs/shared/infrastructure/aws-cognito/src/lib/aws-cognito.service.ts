import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
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

  private validatePassword(password: string): void {
    if (password.length < 8) {
      throw new BadRequestException(
        'Password must be at least 8 characters long',
      );
    }
    // Add more password strength rules as needed
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse> {
    this.validatePassword(password);

    const params: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
      ClientId: process.env['COGNITO_CLIENT_ID'] || '',
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        // { Name: 'email_verified', Value: 'true' }, // TODO: add this once we have a verification process
      ],
    };

    try {
      return await this.cognito.signUp(params).promise();
    } catch (error: unknown) {
      if (error instanceof Error) {
        switch (error.name) {
          case 'UsernameExistsException':
            throw new ConflictException('User already exists');
          case 'InvalidPasswordException':
            throw new BadRequestException('Invalid password format');
          default:
            throw new InternalServerErrorException(error.message);
        }
      }
      throw new InternalServerErrorException('An unknown error occurred');
    }
  }

  //   @UseGuards(ThrottlerGuard)
  //  @Throttle(5, 60) // 5 attempts per minute
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
      // TODO: refactor this to use a custom exception
      if (error instanceof Error) {
        switch (error.name) {
          case 'NotAuthorizedException':
            throw new UnauthorizedException('Invalid credentials');
          case 'UserNotFoundException':
            // Use same message as invalid credentials to prevent user enumeration
            throw new UnauthorizedException('Invalid credentials');
          case 'UserNotConfirmedException':
            throw new ForbiddenException('User not confirmed');
          default:
            // Log the error internally but return generic message
            this.logger.error(error);
            throw new InternalServerErrorException('Authentication failed');
        }
      }
      throw new InternalServerErrorException('Authentication failed');
    }
  }

  private validateRefreshToken(token: string): void {
    if (!token || token.length < 1) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> {
    this.validateRefreshToken(refreshToken);

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
        switch (error.name) {
          case 'NotAuthorizedException':
            throw new UnauthorizedException('Invalid refresh token');
          default:
            this.logger.error(error);
            throw new InternalServerErrorException('Token refresh failed');
        }
      }
      throw new InternalServerErrorException('Token refresh failed');
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
