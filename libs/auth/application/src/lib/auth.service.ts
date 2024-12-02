import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@users/application';
import { JwtService } from '@nestjs/jwt';
import { AwsCognitoService } from '@shared/infrastructure-aws-cognito';

export class AuthService {
  constructor(
    private awsCognitoService: AwsCognitoService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{
    accessToken: string;
  }> {
    try {
      await this.awsCognitoService.signIn(email, pass);
    } catch (error) {
      throw new UnauthorizedException(error); // TODO: return error code
    }

    try {
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        throw 'User is not found after validated user credentials'; // TODO: return error code
      }

      const accessToken = await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
      });

      return {
        accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
