import { SignInUseCase } from '@auth/application';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AwsCognitoService } from '@shared/infrastructure-aws-cognito';

import { AuthResolver } from './resolver/auth.resolver';

@Module({
  providers: [AuthResolver, SignInUseCase, AwsCognitoService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const authConfig = configService.get('auth');

        return {
          secret: authConfig.secret,
          signOptions: { expiresIn: '60s' },
        };
      },
    }),
  ],
  exports: [],
})
export class AuthModule {}
