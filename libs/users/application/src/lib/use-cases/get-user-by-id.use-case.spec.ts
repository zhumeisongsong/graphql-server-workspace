import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { UsersRepository } from '@users/domain';

describe('GetUserByIdUseCase', () => {
  let getUserByIdUseCase: GetUserByIdUseCase;
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = {
      findOneById: jest.fn(),
      findOneByEmail: jest.fn(),
    };
    getUserByIdUseCase = new GetUserByIdUseCase(usersRepository);
  });

  describe('execute', () => {
    it('should return user when found', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
      (usersRepository.findOneById as jest.Mock).mockResolvedValue(mockUser);

      const result = await getUserByIdUseCase.execute('1');

      expect(result).toEqual(mockUser);
      expect(usersRepository.findOneById).toHaveBeenCalledWith('1');
    });

    it('should return null when user not found', async () => {
      (usersRepository.findOneById as jest.Mock).mockResolvedValue(null);

      const result = await getUserByIdUseCase.execute('1');

      expect(result).toBeNull();
      expect(usersRepository.findOneById).toHaveBeenCalledWith('1');
    });
  });
});
