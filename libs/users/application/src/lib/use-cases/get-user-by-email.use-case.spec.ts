import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetUserByEmailUseCase } from './get-user-by-email.use-case';
import { UsersService } from '../users.service';

describe('GetUserByEmailUseCase', () => {
  let useCase: GetUserByEmailUseCase;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByEmailUseCase,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetUserByEmailUseCase>(GetUserByEmailUseCase);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a user when found', async () => {
      const mockUser = { id: '1', email: 'test@test.com', firstName: 'John', lastName: 'Doe' };
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(mockUser);

      const result = await useCase.execute('test@test.com');

      expect(result).toBe(mockUser);
      expect(usersService.findOneByEmail).toHaveBeenCalledWith('test@test.com');
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(usersService, 'findOneByEmail').mockRejectedValue(new NotFoundException());

      await expect(useCase.execute('test@test.com')).rejects.toThrow(NotFoundException);
      expect(usersService.findOneByEmail).toHaveBeenCalledWith('test@test.com');
    });
  });
});
