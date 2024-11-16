import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { GetUserUsecase} from '@user/usecase';
import { MongooseUserRepository, UserSchema } from '@user/infrastructure-mongoose';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [
      // Resolver
      UserResolver,
      // Service
      UserService,
      // Usecase
      GetUserUsecase,
      // Repository
      { provide: 'UserRepository', useClass: MongooseUserRepository }
  ],
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
    MongooseModule.forFeature([{ name: 'UserDocument', schema: UserSchema }]),
  ],
})
export class UserModule {}
