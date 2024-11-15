import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseUserRepository } from './mongoose-user.repository';
import { UserDocument } from './user.schema';
import { User } from '@user/domain';

describe('MongooseUserRepository', () => {
  let repository: MongooseUserRepository;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongooseUserRepository,
        {
          provide: getModelToken(UserDocument.name),
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<MongooseUserRepository>(MongooseUserRepository);
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