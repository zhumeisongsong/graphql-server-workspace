import { Injectable } from '@nestjs/common';
import {
  Args,
  Field,
  InputType,
  Int,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { GenerateSomeSelfCareTasksUseCase } from '@self-care-tasks/application';
import { IsString, Max, Min } from 'class-validator';

@InputType()
class SelfCareTopicInput {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;
}

@InputType()
class CreateSelfCareUserTasksInput {
  @Field(() => [SelfCareTopicInput])
  selfCareTopics!: SelfCareTopicInput[];

  @Field(() => Int)
  @Min(1)
  @Max(100)
  taskCount!: number;

  @Field(() => String)
  @IsString()
  userId!: string;
}

@Injectable()
@Resolver(() => String)
export class SelfCareUserTasksResolver {
  constructor(
    private readonly generateSomeSelfCareTasksUseCase: GenerateSomeSelfCareTasksUseCase,
  ) {}

  @Mutation(() => String)
  async createSelfCareUserTasks(
    @Args('input') input: CreateSelfCareUserTasksInput,
  ): Promise<string> {
    const { selfCareTopics, taskCount, userId } = input;

    this.generateSomeSelfCareTasksUseCase.execute(selfCareTopics, taskCount);
    return '';
  }
}
