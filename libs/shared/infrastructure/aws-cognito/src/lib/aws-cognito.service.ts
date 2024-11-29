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
    if (password.length < 8 || password.length > 50) {
      throw new BadRequestException(
        'Password must be at least 8 characters long',
        'Password must be between 8 and 100 characters long',
      );
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      throw new BadRequestException(
        'Password must contain uppercase, lowercase, numbers, and special characters',
      );
    }
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse> {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('Invalid email format');
    }

    this.validatePassword(password);

    const params: AWS.CognitoIdentityServiceProvider.SignUpRequest = {
      ClientId:
        process.env['COGNITO_CLIENT_ID'] ??
        (() => {
          throw new Error('COGNITO_CLIENT_ID environment variable is required');
        })(),
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
    if (!token || typeof token !== 'string') {
      throw new BadRequestException('Invalid refresh token');
    }

    // Check if token follows JWT format (three parts separated by dots)
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new BadRequestException('Invalid token format');
    }

    // Check if each part is base64 encoded
    try {
      parts.forEach((part) => Buffer.from(part, 'base64').toString());
    } catch {
      throw new BadRequestException('Invalid token encoding');
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

  async confirmSignUp(email: string, confirmationCode: string): Promise<void> {
    if (!email) {
      // TODO: refactor this to use a custom exception
      throw new BadRequestException('Email is required');
    }

    const params: AWS.CognitoIdentityServiceProvider.ConfirmSignUpRequest = {
      ClientId: process.env['COGNITO_CLIENT_ID'] || '',
      Username: email,
      ConfirmationCode: confirmationCode,
    };

    try {
      await this.cognito.confirmSignUp(params).promise();
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
