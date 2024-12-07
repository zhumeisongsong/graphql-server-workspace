import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserTaskDto {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  constructor(id: string, createdAt: Date) {
    this.id = id;
    this.createdAt = createdAt;
  }
}
