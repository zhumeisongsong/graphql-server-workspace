import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@users/domain';

import { UsersService } from './users.service';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';

describe('UsersService', () => {
  let service: UsersService;
  let getUserByIdUseCase: GetUserByIdUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: GetUserByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    getUserByIdUseCase = module.get<GetUserByIdUseCase>(GetUserByIdUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a user if found', async () => {
      const user: User = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
      jest.spyOn(getUserByIdUseCase, 'execute').mockResolvedValue(user);

      const result = await service.findById('1');
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      jest.spyOn(getUserByIdUseCase, 'execute').mockResolvedValue(null);

      const result = await service.findById('2');
      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return a user if found', async () => {
      const user: User = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
      jest.spyOn(getUserByIdUseCase, 'execute').mockResolvedValue(user);

      const result = await service.findByEmail('test@example.com');
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      jest.spyOn(getUserByIdUseCase, 'execute').mockResolvedValue(null);

      const result = await service.findByEmail('test@example.com');
      expect(result).toBeNull();
    });
  });
  
});
