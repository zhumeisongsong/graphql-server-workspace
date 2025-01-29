import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

@ObjectType()
export class TaskDto {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description: string | null;

  constructor(
    id: string,
    title: string,
    description: string | null,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
