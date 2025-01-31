import { Module } from '@nestjs/common';
import {
  SelfCareTasksService,
  GenerateSomeSelfCareTasksUseCase,
} from '@self-care-tasks/application';
import {
  DeepSeekAdapter,
  DeepSeekModule,
} from '@shared/infrastructure-deep-seek';

import { SelfCareUserTasksResolver } from './resolvers/self-care-user-tasks.resolver';
import { AI_SERVICE } from '@ai/domain';

@Module({
  providers: [
    SelfCareUserTasksResolver,
    GenerateSomeSelfCareTasksUseCase,
    SelfCareTasksService,
    {
      provide: AI_SERVICE,
      useClass: DeepSeekAdapter,
    },
  ],
  imports: [DeepSeekModule],
  exports: [SelfCareTasksService],
})
export class SelfCareTasksModule {}
