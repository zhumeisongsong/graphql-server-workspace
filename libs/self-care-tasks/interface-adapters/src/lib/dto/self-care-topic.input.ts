import { Field, InputType, ID } from "@nestjs/graphql";

@InputType()
export class SelfCareTopicInput {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;
}