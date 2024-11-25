import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  constructor(id: string, firstName: string, lastName: string, email: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
