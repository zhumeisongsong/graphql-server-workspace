import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email.use-case';

describe('UsersService', () => {
  let service: UsersService;
  let getUserByIdUseCase: GetUserByIdUseCase;
  let getUserByEmailUseCase: GetUserByEmailUseCase;

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
        {
          provide: GetUserByEmailUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    getUserByIdUseCase = module.get<GetUserByIdUseCase>(GetUserByIdUseCase);
    getUserByEmailUseCase = module.get<GetUserByEmailUseCase>(GetUserByEmailUseCase);
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
      (getUserByIdUseCase.execute as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findOneById('1');

      expect(result).toEqual(mockUser);
      expect(getUserByIdUseCase.execute).toHaveBeenCalledWith('1');
    });

    it('should return null when user not found', async () => {
      (getUserByIdUseCase.execute as jest.Mock).mockResolvedValue(null);

      const result = await service.findOneById('1');

      expect(result).toBeNull();
      expect(getUserByIdUseCase.execute).toHaveBeenCalledWith('1');
    });
  });

  describe('getUserByEmail', () => {
    it('should return user when found', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
      (getUserByEmailUseCase.execute as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findOneByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(getUserByEmailUseCase.execute).toHaveBeenCalledWith('test@example.com');
    });

    it('should return null when user not found', async () => {
      (getUserByEmailUseCase.execute as jest.Mock).mockResolvedValue(null);

      const result = await service.findOneByEmail('test@example.com');

      expect(result).toBeNull();
      expect(getUserByEmailUseCase.execute).toHaveBeenCalledWith('test@example.com');
    });
  });
});
