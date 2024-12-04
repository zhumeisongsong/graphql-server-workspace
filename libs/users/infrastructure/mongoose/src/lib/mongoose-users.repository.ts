import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersRepository } from '@users/domain';
import { Model, Types } from 'mongoose';

import { UserDocument } from './user.schema';

@Injectable()
export class MongooseUsersRepository implements UsersRepository {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const _id = new Types.ObjectId(id);
    const userDocument = await this.userModel.findById(_id).exec();

    if (!userDocument) {
      return null;
    }
    return new User(
      userDocument.id,
      userDocument.email,
      userDocument.firstName,
      userDocument.lastName,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDocument = await this.userModel.findOne({ email }).exec();

    if (!userDocument) {
      return null;
    }
    return new User(
      userDocument.id,
      userDocument.email,
      userDocument.firstName,
      userDocument.lastName,
    );
  }
}
