import { Module } from '@nestjs/common';
import { TasksService, UserTasksService } from '@tasks/application';

import { TasksResolver } from './resolver/tasks.resolver';
import { UserTasksResolver } from './resolver/user-tasks.resolver';

@Module({
  imports: [],
  providers: [TasksResolver, TasksService, UserTasksResolver, UserTasksService],
  exports: [TasksService, UserTasksService],
})
export class TasksModule {}
