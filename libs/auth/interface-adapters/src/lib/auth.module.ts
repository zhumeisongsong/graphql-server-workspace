import { AuthService } from '@auth/application';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@users/interface-adapters';

import { AuthResolver } from './resolver/auth.resolver';

@Module({
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
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
