import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from '@user/infrastructure-graphql';
import { GetUserUsecase } from '@user/usecase';

import { UserService } from './user.service';

@Module({
  providers: [UserService, GetUserUsecase, UserResolver],
  imports: [
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
  ],
})
export class UserModule {}
