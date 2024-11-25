import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserDocument extends Document {
  // refactor: move match regex to a shared lib
  @Prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  email!: string;

  @Prop({ required: true, nullable: true })
  firstName!: string;

  @Prop({ required: true, nullable: true })
  lastName!: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
