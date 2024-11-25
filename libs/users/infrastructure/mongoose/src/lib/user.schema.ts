import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserDocument extends Document {
  @Prop({ required: true })
  email!: string;

  @Prop({ required: true, nullable: true })
  firstName!: string;

  @Prop({ required: true, nullable: true })
  lastName!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
