/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const config = configService.get('userApp');

  await app.listen(config.port);
  Logger.log(
    `🚀 Application is running on: ${config.protocol}://${config.host}:${config.port}`,
  );
}

bootstrap();
