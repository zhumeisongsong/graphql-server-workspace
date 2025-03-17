import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SelfCareTasksModule } from '@self-care-tasks/interface-adapters';
import { TasksModule } from '@tasks/interface-adapters';
import { UsersModule } from '@users/interface-adapters';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    SelfCareTasksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env['NODE_ENV'] !== 'production',
      introspection: process.env['NODE_ENV'] !== 'production',
      sortSchema: true,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class SelfCareHubAppModule {}
