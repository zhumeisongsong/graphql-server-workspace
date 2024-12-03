import { AuthService } from '@auth/application';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AwsCognitoService } from '@shared/infrastructure-aws-cognito';
import { DatabaseModule } from '@shared/infrastructure-mongoose';
import { GetUserUseCase, UsersService } from '@users/application';
import { USERS_REPOSITORY } from '@users/domain';
import {
  MongooseUsersRepository,
  UserDocument,
  UserSchema,
} from '@users/infrastructure-mongoose';
import { UsersModule } from '@users/interface-adapters';

import { AuthResolver } from './resolver/auth.resolver';

@Module({
  providers: [
    AuthResolver,
    AuthService,
    AwsCognitoService,
    UsersService,
    JwtService,
    GetUserUseCase,
    {
      provide: USERS_REPOSITORY,
      useClass: MongooseUsersRepository,
    },
  ],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      global: true,
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
    DatabaseModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
