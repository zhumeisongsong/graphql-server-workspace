import { Field } from '@nestjs/graphql';

export class SignInInputDto {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
