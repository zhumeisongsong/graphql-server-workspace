import { Module } from '@nestjs/common';
import { TasksService } from '@tasks/application';

import { TasksResolver } from './resolver/tasks.resolver';

@Module({
  imports: [],
  providers: [TasksResolver, TasksService],
  exports: [TasksService],
})
export class TasksModule {}
