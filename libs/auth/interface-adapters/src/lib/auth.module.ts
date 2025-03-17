import { SignInUseCase } from '@auth/application';
import { AUTH_SERVICE } from '@auth/domain';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthResolver } from './resolver/auth.resolver';

@Module({
  providers: [
    AuthResolver,
    SignInUseCase,
  ],
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
