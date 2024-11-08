/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { userSubGraph } from '@graphql-federation-workspace/applications-config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = userSubGraph.port;

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: ${userSubGraph.host}:${port}`
  );
}

bootstrap();
