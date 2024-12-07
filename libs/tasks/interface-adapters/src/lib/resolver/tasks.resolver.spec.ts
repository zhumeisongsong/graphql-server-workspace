import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TasksService } from '@tasks/application';

import { TaskDto } from '../dto/task.dto';
import { CreateUserTaskDto } from '../dto/create-user-task.dto';
import { UpdateUserTaskDto } from '../dto/update-user-task.dto';

@Resolver(() => TaskDto)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query(() => TaskDto, { nullable: true })
  async getTasks(): Promise<TaskDto[]> {
    return this.tasksService.findAll();
  }

  @Mutation(() => String)
  async createUserTasks(
    @Args('userId') userId: string,
    @Args('tasks') tasks: CreateUserTaskDto[],
  ): Promise<string> {
    return this.tasksService.createUserTasks(userId, tasks);
  }

  @Mutation(() => String)
  async updateUserTasks(
    @Args('userId') userId: string,
    @Args('userTasks') userTasks: UpdateUserTaskDto[],
  ): Promise<string> {
    return this.tasksService.updateUserTasks(userId, userTasks);
  }
}
