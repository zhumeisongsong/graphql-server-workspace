import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { gatewayConfig, userAppConfig } from '@shared/config';
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
                  url: `${userAppConfig.protocol}://${userAppConfig.host}:${userAppConfig.port}/graphql`,
                },
              ],
            }),
            buildService: ({ url = '' }) => {
              return new RemoteGraphQLDataSource({
                url,
                willSendRequest({ request, context }) {
                  // rebuild header
                  if (Object.keys(context).length > 0 && request.http) {
                    request.http.headers.set(
                      'Authorization',
                      context['req']['headers']['authorization'],
                    );
                  }
                },
              });
            },
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
