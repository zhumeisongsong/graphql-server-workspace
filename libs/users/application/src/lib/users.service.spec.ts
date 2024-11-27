import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { User } from '@users/domain';

describe('UsersService', () => {
  let service: UsersService;
  let getUserUseCase: GetUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: GetUserUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    getUserUseCase = module.get<GetUserUseCase>(GetUserUseCase);
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
      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue(user);

      const result = await service.findById('1');
      expect(result).toEqual(user);
    });

    it('should return null if user not found', async () => {
      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue(null);

      const result = await service.findById('2');
      expect(result).toBeNull();
    });
  });
});
