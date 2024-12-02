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
      const user = await this.usersService.findByEmail(email);
      const accessToken = await this.jwtService.signAsync({
        sub: user.id,
        username: user.email,
      });
      return {
        accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
