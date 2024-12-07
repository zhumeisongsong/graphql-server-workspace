import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserTasksService } from '@tasks/application';

import { CreateUserTaskDto } from '../dto/create-user-task.dto';
import { UpdateUserTaskDto } from '../dto/update-user-task.dto';
import { UserTaskDto } from '../dto/user-task.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
@Resolver(() => [UserTaskDto])
export class UserTasksResolver {
  constructor(private userTasksService: UserTasksService) {}

  @Query(() => [UserTaskDto])
  async findUserTasks(
    @Args('userId') userId: string,
    @Args('range') range: { from: Date; to: Date },
  ): Promise<UserTaskDto[]> {
    return this.userTasksService.findMany(userId, range);
  }

  @Mutation(() => String)
  async createUserTasks(
    @Args('userId') userId: string,
    @Args('tasks') tasks: CreateUserTaskDto[],
  ): Promise<string> {
    return this.userTasksService.createSome(userId, tasks);
  }

  @Mutation(() => String)
  async updateUserTasks(
    @Args('userId') userId: string,
    @Args('userTasks') userTasks: UpdateUserTaskDto[],
  ): Promise<string> {
    return this.userTasksService.updateSome(userId, userTasks);
  }
}
