import { AIModule } from '@ai/interface-adapters';
import { Module } from '@nestjs/common';
import {
  SelfCareTasksService,
  GenerateSomeSelfCareTasksUseCase,
} from '@self-care-tasks/application';


@Module({
  providers: [
    GenerateSomeSelfCareTasksUseCase,
    SelfCareTasksService,
  ],
  imports: [AIModule],
  exports: [SelfCareTasksService],
})
export class SelfCareTasksModule {}