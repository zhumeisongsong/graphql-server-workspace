import { AI_SERVICE } from '@ai/domain';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { deepSeekConfig } from '@shared/config';

import { DeepSeekAdapter } from './deep-seek.adapter';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      load: [deepSeekConfig],
    }),
  ],
  providers: [
    {
      provide: AI_SERVICE,
      useClass: DeepSeekAdapter,
    },
  ],
  exports: [AI_SERVICE],
})
export class DeepSeekModule {}
