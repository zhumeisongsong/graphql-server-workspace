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
  const config = configService.get('gateway');
  const host = config.host;
  const port = config.port;

  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${host}:${port}`);
}

bootstrap();
