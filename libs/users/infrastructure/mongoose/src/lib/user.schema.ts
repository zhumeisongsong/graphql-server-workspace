import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserDocument extends Document {
  @Prop({ required: true })
  email!: string;

  @Prop({ required: false })
  firstName!: string;

  @Prop({ required: false })
  lastName!: string;

  @Prop({ required: true, nullable: true })
  password!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
