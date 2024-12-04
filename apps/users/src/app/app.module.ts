import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
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
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        /**
         * MEMO:
         * Because of this problem, so mush need specify the version
         * https://github.com/nestjs/graphql/issues/2646#issuecomment-1567381944
         */
        federation: 2,
      },
      playground: process.env['NODE_ENV'] !== 'production',
      sortSchema: true,
      plugins: [ApolloServerPluginInlineTrace()],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
