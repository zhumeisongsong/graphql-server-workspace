import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TaskDocument extends Document {
  @Prop({ required: true, maxlength: 200 })
  title!: string;

  @Prop({ required: false, default: null, maxlength: 1000 })
  description!: string;

  @Prop({ required: true, index: true, maxlength: 100 })
  categories!: string[];
}

export const TaskSchema = SchemaFactory.createForClass(TaskDocument);
