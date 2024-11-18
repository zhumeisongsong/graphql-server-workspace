import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
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
