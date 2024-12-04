import { GetUserByEmailUseCase } from './get-user-by-email.use-case';
import { UsersRepository } from '@users/domain';

describe('GetUserByEmailUseCase', () => {
  let getUserByEmailUseCase: GetUserByEmailUseCase;
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
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
      (usersRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);

      const result = await getUserByEmailUseCase.execute('test@example.com');

      expect(result).toEqual(mockUser);
      expect(usersRepository.findByEmail).toHaveBeenCalledWith('1');
    });

    it('should return null when user not found', async () => {
      (usersRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      const result = await getUserByEmailUseCase.execute('test@example.com');

      expect(result).toBeNull();
      expect(usersRepository.findByEmail).toHaveBeenCalledWith('1');
    });
  });
});
