import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserDocument extends Document {
  // refactor: move match regex to a shared lib
  @Prop({
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxlength: 100,
  })
  email!: string;

  @Prop({ required: false, default: null, maxlength: 100 })
  firstName!: string;

  @Prop({ required: false, default: null, maxlength: 100 })
  lastName!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
