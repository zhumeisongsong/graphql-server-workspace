import { AuthService } from '@auth/application';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AwsCognitoService } from '@shared/infrastructure-aws-cognito';
import { UsersService } from '@users/application';
import { UsersModule } from '@users/interface-adapters';

import { AuthResolver } from './resolver/auth.resolver';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    AwsCognitoService,
    UsersService,
    JwtService,
  ],
  imports: [UsersModule, JwtModule],
  exports: [],
})
export class AuthModule {}
