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
    const mockUser = {
      id: '507f1f77bcf86cd799439011',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      name: 'John Doe'
    };

    jest.spyOn(userModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    } as any);

    const user = await repository.findById(mockUser.id);
    expect(user).toBeInstanceOf(User);
    expect(user?.id).toBe(mockUser.id);
    expect(user?.firstName).toBe(mockUser.firstName);
    expect(user?.lastName).toBe(mockUser.lastName);
    expect(user?.email).toBe(mockUser.email);
    expect(user?.password).toBe(mockUser.password);
  });

  it('should return null when user is not found', async () => {
    jest.spyOn(userModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    } as any);

    const user = await repository.findById('507f1f77bcf86cd799439011');
    expect(user).toBeNull();
  });
});