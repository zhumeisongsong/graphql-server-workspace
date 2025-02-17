import { Field, InputType, Int, ID } from '@nestjs/graphql';
import { IsString, Max, Min } from 'class-validator';

import { SelfCareTopicInput } from './self-care-topic.input';

@InputType()
export class CreateSelfCareUserTasksInput {
  @Field(() => [SelfCareTopicInput])
  selfCareTopics!: SelfCareTopicInput[];

  @Field(() => Int)
  @Min(1)
  @Max(100)
  taskCount!: number;

  @Field(() => ID)
  @IsString()
  userId!: string;
}
