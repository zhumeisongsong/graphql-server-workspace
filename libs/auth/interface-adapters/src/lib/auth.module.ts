import { AuthService } from '@auth/application';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
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
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => {
        const jwtConfig = configService.get('jwt');
        return {
          secret: jwtConfig.secret,
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [],
})
export class AuthModule {}
