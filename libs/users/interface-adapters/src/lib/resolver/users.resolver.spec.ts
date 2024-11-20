import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@users/application';
import { User } from '@users/domain';

import { UsersResolver } from './users.resolver';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const user = new User('1', 'John Doe');
      jest.spyOn(service, 'findById').mockResolvedValue(user);

      const result = await resolver.getUser('1');
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(null);

      const result = await resolver.getUser('1');
      expect(result).toBeNull();
    });
  });
});
