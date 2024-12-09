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
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<MongooseUsersRepository>(MongooseUsersRepository);
    userModel = module.get<Model<UserDocument>>(
      getModelToken(UserDocument.name),
    );
  });

  it('should return a user when found', async () => {
    const user = await repository.findOneById('123');
    expect(user).toBeInstanceOf(User);
  });

  it('should return null when user is not found', async () => {
    const user = await repository.findOneById('123');
    expect(user).toBeNull();
  });

  it('should return a user when found by email', async () => {
    const user = await repository.findOneByEmail('john@example.com');
    expect(user).toBeInstanceOf(User);
  });

  it('should return null when user is not found by email', async () => {
    const user = await repository.findOneByEmail('john@example.com');
    expect(user).toBeNull();
  });
});
