import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './models/user.model';

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

  it('should return a user by id', () => {
    const user: User = service.findById(1);
    expect(user).toEqual({ id: 1, name: 'John Doe' });
  });

  it('should return undefined if user is not found', () => {
    const user: User = service.findById(3);
    expect(user).toBeUndefined();
  });
});