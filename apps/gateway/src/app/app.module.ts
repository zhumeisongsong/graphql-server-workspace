import { IntrospectAndCompose } from '@apollo/gateway';
import { gatewayConfig, userAppConfig } from '@libs/config';
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
      load: [gatewayConfig, userAppConfig],
    }),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      imports: [ConfigModule],
      inject: [ConfigService],
      driver: ApolloGatewayDriver,
      useFactory: (configService: ConfigService) => {
        const userAppConfig = configService.get('userApp');
        return {
          driver: ApolloGatewayDriver,
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: [
                {
                  name: userAppConfig.name,
                  url: `${userAppConfig.host}:${userAppConfig.port}/graphql`,
                },
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
