import { Injectable } from '@nestjs/common';
import { Args, Field, Mutation, ObjectType, Resolver } from '@nestjs/graphql';
import { GenerateSomeSelfCareTasksUseCase } from '@self-care-tasks/application';

import { CreateSelfCareUserTasksInput } from '../dto/create-self-care-user-tasks.input';

@ObjectType()
export class CreateSelfCareUserTasksResponse {
  @Field(() => String)
  message!: string;
}

@Injectable()
@Resolver(() => String)
export class SelfCareUserTasksResolver {
  constructor(
    private readonly generateSomeSelfCareTasksUseCase: GenerateSomeSelfCareTasksUseCase,
  ) {}

  @Mutation(() => CreateSelfCareUserTasksResponse)
  async createSelfCareUserTasks(
    @Args('input') input: CreateSelfCareUserTasksInput,
  ): Promise<CreateSelfCareUserTasksResponse> {

      const { selfCareTopics, taskCount, userId } = input;

    return { message: 'Success' };

  }
}
