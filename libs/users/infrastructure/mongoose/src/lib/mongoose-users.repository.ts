import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersRepository } from '@users/domain';
import { Model } from 'mongoose';

import { UserDocument } from './user.schema';

@Injectable() 
export class MongooseUsersRepository implements UsersRepository {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const userDoc = await this.userModel.findById(id).exec();

    if (!userDoc) {
      return null;
    }
    return new User(userDoc.id, userDoc.name);
  }
}
