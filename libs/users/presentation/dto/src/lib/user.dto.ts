import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
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
