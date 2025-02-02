import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AI_SERVICE } from '@ai/domain';
import { DeepSeekAdapter } from '@shared/infrastructure-deep-seek';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule,
    HttpModule
  ],
  providers: [
    {
      provide: AI_SERVICE,
      useClass: DeepSeekAdapter,
    },
  ],
  exports: [AI_SERVICE],
})
export class AIModule {}