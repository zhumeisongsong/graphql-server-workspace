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
    it('should return a user by id', () => {
      const user: User = { id: '1', name: 'John Doe' };
      jest.spyOn(service, 'findById').mockReturnValue(user);

      expect(resolver.getUser('1')).toEqual(user);
      expect(service.findById).toHaveBeenCalledWith('1');
    });

    it('should return undefined if user not found', () => {
      jest.spyOn(service, 'findById').mockReturnValue(undefined);

      expect(resolver.getUser('2')).toBeNull();
      expect(service.findById).toHaveBeenCalledWith('2');
    });
  });

  describe('resolveReference', () => {
    it('should return a user by reference id', () => {
      const user: User = { id: '1', name: 'John Doe' };
      jest.spyOn(service, 'findById').mockReturnValue(user);

      expect(
        resolver.resolveReference({ __typename: 'User', id: '1' }),
      ).toEqual(user);
      expect(service.findById).toHaveBeenCalledWith('1');
    });

    it('should return undefined if user not found by reference id', () => {
      jest.spyOn(service, 'findById').mockReturnValue(undefined);

      expect(
        resolver.resolveReference({ __typename: 'User', id: '2' }),
      ).toBeUndefined();
      expect(service.findById).toHaveBeenCalledWith('2');
    });
  });
});
