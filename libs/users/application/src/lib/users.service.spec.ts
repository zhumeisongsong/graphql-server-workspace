import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { USERS_REPOSITORY } from '@users/domain';
import { userError } from '@zhumeisong/common-error-exception';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: any;

  beforeEach(async () => {
    usersRepository = {
      findOneById: jest.fn(),
      findOneByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USERS_REPOSITORY,
          useValue: usersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return a user when found', async () => {
      const mockUser = { id: '1', email: 'test@test.com', firstName: 'John', lastName: 'Doe' };
      usersRepository.findOneById.mockResolvedValue(mockUser);

      const result = await service.findOneById('1');

      expect(result).toBe(mockUser);
      expect(usersRepository.findOneById).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when user is not found', async () => {
      usersRepository.findOneById.mockResolvedValue(null);

      await expect(service.findOneById('1')).rejects.toThrow(
        new NotFoundException(userError.NOT_FOUND)
      );
      expect(usersRepository.findOneById).toHaveBeenCalledWith('1');
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user when found', async () => {
      const mockUser = { id: '1', email: 'test@test.com', firstName: 'John', lastName: 'Doe' };
      usersRepository.findOneByEmail.mockResolvedValue(mockUser);

      const result = await service.findOneByEmail('test@test.com');

      expect(result).toBe(mockUser);
      expect(usersRepository.findOneByEmail).toHaveBeenCalledWith('test@test.com');
    });

    it('should throw NotFoundException when user is not found', async () => {
      usersRepository.findOneByEmail.mockResolvedValue(null);

      await expect(service.findOneByEmail('test@test.com')).rejects.toThrow(
        new NotFoundException(userError.NOT_FOUND)
      );
      expect(usersRepository.findOneByEmail).toHaveBeenCalledWith('test@test.com');
    });
  });
});
