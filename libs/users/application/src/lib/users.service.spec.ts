import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@users/domain';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user by id', async () => {
    const user = new User('1', 'John Doe');
    jest.spyOn(service, 'findById').mockResolvedValue(user);

    const result = await service.findById('1');
    expect(result).toEqual(user);
  });

  it('should return undefined if user is not found', async () => {
    jest.spyOn(service, 'findById').mockResolvedValue(null);

    const result = await service.findById('1');
    expect(result).toBeNull();
   
  });
});
