import { selfCareTasksAppConfig } from '@applications/self-care-config';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [selfCareTasksAppConfig],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      playground: process.env['NODE_ENV'] !== 'production',
      sortSchema: true,
      plugins: [ApolloServerPluginInlineTrace()],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
