import { InjectModel } from '@nestjs/mongoose';
import { User, UserRepository } from '@user/domain';
import { Model } from 'mongoose';

import { UserDocument } from './user.schema';

export class MongooseUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserDocument.name) private userModel: Model<UserDocument>,
  ) {}

  async findById(id: string): Promise<User | null> {
    const userDoc = await this.userModel.findById(id).exec();
    return userDoc ? new User(userDoc.id, userDoc.name) : null;
  }
}
