import { AuthService, AUTH_SERVICE } from '@auth/domain';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SignInUseCase {
  constructor(
    @Inject(AUTH_SERVICE)
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  // Retrieving a user and verifying the password
  async execute(
    email: string,
    pass: string,
  ): Promise<{
    accessToken: string;
  }> {
    try {
      await this.authService.signIn(email, pass);
    } catch (error) {
      throw new UnauthorizedException(error); // TODO: return error code
    }

    try {
      const accessToken = await this.jwtService.signAsync({
        email: email,
      });

      return {
        accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials'); // TODO: return error code
    }
  }
}
