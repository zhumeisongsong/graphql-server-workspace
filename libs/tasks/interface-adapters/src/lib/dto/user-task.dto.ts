import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserDto } from '@users/interface-adapters';

import { TaskDto } from './task.dto';

@ObjectType()
export class UserTaskDto {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;

  @Field(() => String)
  taskId: string;

  @Field(() => TaskDto, { nullable: true })
  task: TaskDto | null;

  @Field(() => String)
  userId: string;

  @Field(() => UserDto, { nullable: true })
  user: UserDto | null;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date | null,
    taskId: string,
    task: TaskDto | null,
    userId: string,
    user: UserDto | null,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.taskId = taskId;
    this.task = task;
    this.userId = userId;
    this.user = user;
  }
}
