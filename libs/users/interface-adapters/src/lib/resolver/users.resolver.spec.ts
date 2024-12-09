import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@users/application';

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
            findOneById: jest.fn(),
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
});
