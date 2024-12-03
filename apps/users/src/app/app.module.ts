import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  databaseConfig,
  userAppConfig,
  awsConfig,
  authConfig,
} from '@shared/config';
import { UsersModule } from '@users/interface-adapters';
import { AuthModule } from '@auth/interface-adapters';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [userAppConfig, databaseConfig, awsConfig, authConfig],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
