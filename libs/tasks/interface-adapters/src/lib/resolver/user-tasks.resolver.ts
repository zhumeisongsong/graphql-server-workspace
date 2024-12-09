import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserTasksService } from '@tasks/application';

import { CreateUserTaskDto } from '../dto/create-user-task.dto';
import { UpdateUserTaskDto } from '../dto/update-user-task.dto';
import { UserTaskDto } from '../dto/user-task.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
@Resolver(() => [UserTaskDto])
export class UserTasksResolver {
  private readonly logger = new Logger(UserTasksResolver.name);
  constructor(private userTasksService: UserTasksService) {}

  @Query(() => [UserTaskDto])
  async findUserTasks(
    @Args('userId', {
      description: 'The ID of the user to find tasks for',
    })
    userId: string,
    @Args('range', {
      description: 'Date range for task filtering',
    })
    range: { from: Date; to: Date },
  ): Promise<UserTaskDto[]> {
    try {
      if (!userId?.trim()) {
        throw new BadRequestException('Invalid userId'); // TODO: using error codes
      }

      if (!range.from || !range.to) {
        throw new BadRequestException('Invalid date range'); // TODO: using error codes
      }

      if (range.from > range.to) {
        throw new BadRequestException('Invalid date range'); // TODO: using error codes
      }

      return this.userTasksService.findMany(userId, range);
    } catch (error) {
      this.logger.error('FindUserTasks error:', error);
      throw new InternalServerErrorException('Failed to fetch user tasks'); // TODO: using error codes
    }
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
