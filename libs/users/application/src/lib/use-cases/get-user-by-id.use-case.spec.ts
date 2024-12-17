import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { UsersService } from '../users.service';

describe('GetUserByIdUseCase', () => {
  let useCase: GetUserByIdUseCase;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserByIdUseCase,
        {
          provide: UsersService,
          useValue: {
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetUserByIdUseCase>(GetUserByIdUseCase);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a user when found', async () => {
      const mockUser = { id: '1', email: 'test@test.com', firstName: 'John', lastName: 'Doe' };
      jest.spyOn(usersService, 'findOneById').mockResolvedValue(mockUser);

      const result = await useCase.execute('1');

      expect(result).toBe(mockUser);
      expect(usersService.findOneById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(usersService, 'findOneById').mockRejectedValue(new NotFoundException());

      await expect(useCase.execute('1')).rejects.toThrow(NotFoundException);
      expect(usersService.findOneById).toHaveBeenCalledWith('1');
    });
  });
});
