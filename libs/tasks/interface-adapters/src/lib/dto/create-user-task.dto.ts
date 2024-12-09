import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

import { BaseTaskDto } from './base-task.dto';

@InputType({ description: 'Input type for creating a new user task' })
export class CreateUserTaskDto extends BaseTaskDto {
  @Field(() => Date)
  @IsNotEmpty()
  createdAt: Date = new Date();

  constructor(id: string, createdAt: Date) {
    super(id);
    this.createdAt = createdAt;
  }
}
