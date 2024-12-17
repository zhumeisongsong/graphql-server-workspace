import { Test, TestingModule } from '@nestjs/testing';
import { GetUserByIdUseCase } from '@users/application';
import { UsersResolver } from './users.resolver';
import { UserDto } from '../dto/user.dto';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let getUserByIdUseCase: jest.Mocked<GetUserByIdUseCase>;

  beforeEach(async () => {
    getUserByIdUseCase = {
      execute: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: GetUserByIdUseCase,
          useValue: getUserByIdUseCase,
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a UserDto when user is found', async () => {
      const mockUser = {
        id: '1',
        email: 'test@test.com',
        firstName: 'John',
        lastName: 'Doe'
      };
      getUserByIdUseCase.execute.mockResolvedValue(mockUser);

      const result = await resolver.getUser('1');

      expect(result).toBeInstanceOf(UserDto);
      expect(result).toEqual(new UserDto(
        mockUser.id,
        mockUser.email,
        mockUser.firstName,
        mockUser.lastName
      ));
      expect(getUserByIdUseCase.execute).toHaveBeenCalledWith('1');
    });

    it('should propagate errors from use case', async () => {
      const error = new Error('Test error');
      getUserByIdUseCase.execute.mockRejectedValue(error);

      await expect(resolver.getUser('1')).rejects.toThrow(error);
      expect(getUserByIdUseCase.execute).toHaveBeenCalledWith('1');
    });
  });
});
