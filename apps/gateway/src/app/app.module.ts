import { IntrospectAndCompose } from '@apollo/gateway';
import { gatewayConfig, tasksAppConfig, usersAppConfig } from '@shared/config';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [gatewayConfig, usersAppConfig, tasksAppConfig],
    }),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloGatewayDriver,
      useFactory: (configService: ConfigService) => {
        const usersAppConfig = configService.get('usersApp');
        const tasksAppConfig = configService.get('tasksApp');
        
        return {
          driver: ApolloGatewayDriver,
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: [
                {
                  name: usersAppConfig.name,
                  url: `${usersAppConfig.protocol}://${usersAppConfig.host}:${usersAppConfig.port}/graphql`,
                },
                {
                  name: tasksAppConfig.name,
                  url: `${tasksAppConfig.protocol}://${tasksAppConfig.host}:${tasksAppConfig.port}/graphql`,
                }
              ],
            }),
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
