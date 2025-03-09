import { AIModule } from '@ai/interface-adapters';
import { Module } from '@nestjs/common';
import {
  SelfCareTasksService,
  GenerateSomeSelfCareTasksUseCase,
} from '@self-care-tasks/application';

import { SelfCareUserTasksResolver } from './resolver/self-care-user-tasks.resolver';

@Module({
  providers: [
    GenerateSomeSelfCareTasksUseCase,
    SelfCareUserTasksResolver,
    SelfCareTasksService,
  ],
  imports: [AIModule],
  exports: [SelfCareTasksService],
})
export class SelfCareTasksModule {}