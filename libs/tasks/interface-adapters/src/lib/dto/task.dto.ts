import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ObjectType()
export class TaskDto {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description: string | null;

  @Field(() => [String])
  categories: string[];

  constructor(
    id: string,
    title: string,
    description: string | null,
    categories: string[],
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.categories = categories;
  }
}
