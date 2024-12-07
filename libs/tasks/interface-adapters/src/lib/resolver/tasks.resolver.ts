import { Query, Resolver } from '@nestjs/graphql';
import { TasksService } from '@tasks/application';

import { TaskDto } from '../dto/task.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
@Resolver(() => [TaskDto])
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query(() => [TaskDto])
  async getTasks(): Promise<TaskDto[]> {
    return this.tasksService.findAll();
  }
}
