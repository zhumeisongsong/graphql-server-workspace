import { Module } from '@nestjs/common';
import {
  TasksService,
  UserTasksService,
  GetAllTasksUseCase,
} from '@tasks/application';

import { TasksResolver } from './resolver/tasks.resolver';
import { UserTasksResolver } from './resolver/user-tasks.resolver';

@Module({
  providers: [
    TasksResolver,
    TasksService,
    GetAllTasksUseCase,
    UserTasksResolver,
    UserTasksService,
  ],
  imports: [],
  exports: [TasksService, UserTasksService],
})
export class TasksModule {}
