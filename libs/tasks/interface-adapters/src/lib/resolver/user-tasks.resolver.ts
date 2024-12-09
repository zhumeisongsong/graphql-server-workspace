import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserTasksService } from '@tasks/application';

import { CreateUserTaskDto } from '../dto/create-user-task.dto';
import { UpdateUserTaskDto } from '../dto/update-user-task.dto';
import { UserTaskDto } from '../dto/user-task.dto';

@Injectable()
@Resolver(() => [UserTaskDto])
export class UserTasksResolver {
  private readonly logger = new Logger(UserTasksResolver.name);
  constructor(private userTasksService: UserTasksService) {}

  @Query(() => [UserTaskDto])
  async getUserTasks(
    @Args('userId', {
      description: 'The ID of the user to find tasks for',
    })
    userId: string,
  ): Promise<UserTaskDto[]> {
    try {
      if (!userId?.trim()) {
        throw new BadRequestException('Invalid userId'); // TODO: using error codes
      }

      return this.userTasksService.findMany(userId);
    } catch (error) {
      this.logger.error('FindUserTasks error:', error);
      throw new InternalServerErrorException('Failed to fetch user tasks'); // TODO: using error codes
    }
  }

  @Mutation(() => String)
  async createUserTasks(
    @Args('userId') userId: string,
    @Args('tasks', { type: () => [CreateUserTaskDto] })
    tasks: CreateUserTaskDto[],
  ): Promise<string> {
    return this.userTasksService.createSome(userId, tasks);
  }

  @Mutation(() => String)
  async updateUserTasks(
    @Args('userId') userId: string,
    @Args('userTasks', { type: () => [UpdateUserTaskDto] })
    userTasks: UpdateUserTaskDto[],
  ): Promise<string> {
    return this.userTasksService.updateSome(userId, userTasks);
  }
}
