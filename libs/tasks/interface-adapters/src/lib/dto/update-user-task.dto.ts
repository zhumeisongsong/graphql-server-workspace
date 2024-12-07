import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserTaskDto {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  updatedAt: Date;

  constructor(id: string, updatedAt: Date) {
    this.id = id;
    this.updatedAt = updatedAt;
  }
}
