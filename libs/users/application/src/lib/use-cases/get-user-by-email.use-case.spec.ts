import { GetUserByEmailUseCase } from './get-user-by-email.use-case';
import { UsersRepository } from '@users/domain';

describe('GetUserByEmailUseCase', () => {
  let getUserByEmailUseCase: GetUserByEmailUseCase;
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = {
      findOneById: jest.fn(),
      findOneByEmail: jest.fn(),
    };
    getUserByEmailUseCase = new GetUserByEmailUseCase(usersRepository);
  });

  describe('execute', () => {
    it('should return user when found', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
      (usersRepository.findOneByEmail as jest.Mock).mockResolvedValue(mockUser);

      const result = await getUserByEmailUseCase.execute('test@example.com');

      expect(result).toEqual(mockUser);
      expect(usersRepository.findOneByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
    });

    it('should return null when user not found', async () => {
      (usersRepository.findOneByEmail as jest.Mock).mockResolvedValue(null);

      const result = await getUserByEmailUseCase.execute('test@example.com');

      expect(result).toBeNull();
      expect(usersRepository.findOneByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
    });
  });
});
