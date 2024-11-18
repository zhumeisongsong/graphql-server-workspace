import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from '@shared/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseConfig = configService.get('database');

        return {
          uri: `mongodb://${databaseConfig.host}:${databaseConfig.port}`,
          dbName: databaseConfig.name,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
