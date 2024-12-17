import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/infrastructure-mongoose';
import {
  TasksService,
  UserTasksService,
  GetAllTasksUseCase,
  GetAllUserTasksUseCase,
  CreateSomeUserTasksUseCase,
  UpdateSomeUserTasksUseCase,
} from '@tasks/application';
import {
  MongooseTasksRepository,
  TaskDocument,
  TaskSchema,
} from '@tasks/infrastructure-mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { TASKS_REPOSITORY } from '@tasks/domain';

import { TasksResolver } from './resolver/tasks.resolver';
import { UserTasksResolver } from './resolver/user-tasks.resolver';

@Module({
  providers: [
    TasksResolver,
    TasksService,
    UserTasksResolver,
    UserTasksService,
    GetAllTasksUseCase,
    GetAllUserTasksUseCase,
    CreateSomeUserTasksUseCase,
    UpdateSomeUserTasksUseCase,
    {
      provide: TASKS_REPOSITORY,
      useClass: MongooseTasksRepository,
    },
  ],
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: TaskDocument.name, schema: TaskSchema },
    ]),
  ],
  exports: [TasksService, UserTasksService],
})
export class TasksModule {}
