import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@users/domain';

import { UserDocument } from './user.schema';
import { MongooseUsersRepository } from './mongoose-users.repository';

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
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<MongooseUsersRepository>(MongooseUsersRepository);
    userModel = module.get<Model<UserDocument>>(getModelToken(UserDocument.name));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findOneByEmail', () => {
    it('should return User when found', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      jest.spyOn(userModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);

      const result = await repository.findOneByEmail('test@example.com');
      expect(result).toBeInstanceOf(User);
      expect(result?.id).toBe(mockUser.id);
      expect(result?.email).toBe(mockUser.email);
      expect(result?.firstName).toBe(mockUser.firstName);
      expect(result?.lastName).toBe(mockUser.lastName);
    });
  });
});
