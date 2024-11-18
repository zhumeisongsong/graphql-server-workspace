import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
