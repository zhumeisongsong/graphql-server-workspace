import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { BaseTaskDto } from './base-task.dto';

@InputType({ description: 'Input type for updating a user task' })
export class UpdateUserTaskDto extends BaseTaskDto {
  @Field(() => Date)
  @IsNotEmpty()
  updatedAt: Date = new Date();

  constructor(id: string, updatedAt: Date) {
    super(id);
    this.updatedAt = updatedAt;
  }
}
