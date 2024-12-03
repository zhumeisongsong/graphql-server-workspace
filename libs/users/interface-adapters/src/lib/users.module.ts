import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '@shared/infrastructure-mongoose';
import { UsersService, GetUserUseCase } from '@users/application';
import { UsersResolver } from '@users/interface-adapters';
import {
  MongooseUsersRepository,
  UserDocument,
  UserSchema,
} from '@users/infrastructure-mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { USERS_REPOSITORY } from '@users/domain';

@Module({
  providers: [
    UsersResolver,
    UsersService,
    GetUserUseCase,
    {
      provide: USERS_REPOSITORY,
      useClass: MongooseUsersRepository,
    },
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
    DatabaseModule,
    MongooseModule.forFeature([{ name: UserDocument.name, schema: UserSchema }])
  ],
  exports: [UsersService],
})
export class UsersModule {}
