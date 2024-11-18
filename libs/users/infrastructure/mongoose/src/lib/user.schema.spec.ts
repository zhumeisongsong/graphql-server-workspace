import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';

describe('UserDocument', () => {
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(UserDocument.name),
          useValue: Model,
        },
      ],
    }).compile();

    userModel = module.get<Model<UserDocument>>(getModelToken(UserDocument.name));
  });

  it('should be defined', () => {
    expect(userModel).toBeDefined();
  });

  // it('should require name field', () => {
  //   const user = new userModel();
  //   const error = user.validateSync();
  //   expect(error.errors['name']).toBeDefined();
  // });

  // it('should create a user with a name', () => {
  //   const user = new userModel({ name: 'John Doe' });
  //   expect(user.name).toBe('John Doe');
  // });
});