import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsUUID } from "class-validator";

@InputType({ isAbstract: true })
export abstract class BaseTaskDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}