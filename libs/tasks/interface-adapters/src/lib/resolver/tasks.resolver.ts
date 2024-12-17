import { Injectable } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GetAllTasksUseCase } from '@tasks/application';

import { TaskDto } from '../dto/task.dto';

@Injectable()
@Resolver(() => [TaskDto])
export class TasksResolver {
  constructor(private getAllTasksUseCase: GetAllTasksUseCase) {}

  @Query(() => [TaskDto])
  async getTasks(): Promise<TaskDto[]> {
    return this.getAllTasksUseCase.execute();
  }
}
