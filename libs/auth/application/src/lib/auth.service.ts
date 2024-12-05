import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AwsCognitoService } from '@shared/infrastructure-aws-cognito';

// Implement the authentication logic
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private awsCognitoService: AwsCognitoService,
    private jwtService: JwtService,
  ) {}

  // Retrieving a user and verifying the password
  async signIn(
    email: string,
    pass: string,
  ): Promise<{
    accessToken: string;
  }> {
    // try {
    //   await this.awsCognitoService.signIn(email, pass);
    // } catch (error) {
    //   this.logger.error('SignIn error:', error);
    //   throw new UnauthorizedException(error); // TODO: return error code
    // }

    try {
      const accessToken = await this.jwtService.signAsync({
        // sub: user.id, // TODO: Id from cognito
        email: email,
      });

      return {
        accessToken,
      };
    } catch (error) {
      this.logger.error('SignIn error:', error);
      throw new UnauthorizedException('Invalid credentials'); // TODO: return error code
    }
  }
}
