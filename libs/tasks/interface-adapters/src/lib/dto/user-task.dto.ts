import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

import { TaskDto } from './task.dto';

@ObjectType()
export class UserTaskDto {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  updatedAt: Date | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  taskId: string;

  @Field(() => TaskDto, { nullable: true })
  @IsOptional()
  task: TaskDto | null;

  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date | null,
    taskId: string,
    task: TaskDto | null,
    userId: string
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.taskId = taskId;
    this.task = task;
    this.userId = userId;
  }
}
