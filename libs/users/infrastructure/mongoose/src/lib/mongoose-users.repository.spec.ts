import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseUsersRepository } from './mongoose-users.repository';
import { UserDocument } from './user.schema';
import { User } from '@users/domain';

describe('MongooseUsersRepository', () => {
  let repository: MongooseUsersRepository;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongooseUsersRepository,
        {
          provide: getModelToken(UserDocument.name),
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<MongooseUsersRepository>(MongooseUsersRepository);
    userModel = module.get<Model<UserDocument>>(getModelToken(UserDocument.name));
  });

  it('should return a user when found', async () => {
    const userDoc = { id: '1', name: 'John Doe' };
    jest.spyOn(userModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(userDoc),
    } as any);

    const user = await repository.findById('1');
    expect(user).toEqual(new User('1', 'John Doe'));
  });

  it('should return null when user is not found', async () => {
    jest.spyOn(userModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    const user = await repository.findById('1');
    expect(user).toBeNull();
  });
});