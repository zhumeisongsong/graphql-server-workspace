import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string | null;

  @Field()
  lastName: string | null;

  constructor(
    id: string,
    email: string,
    firstName: string | null,
    lastName: string | null,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
