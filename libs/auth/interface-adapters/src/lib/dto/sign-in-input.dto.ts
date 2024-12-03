import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInInputDto {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
