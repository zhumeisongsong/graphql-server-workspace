import { GetUserByIdUseCase } from './get-user-by-id.use-case';
import { UsersRepository } from '@users/domain';

describe('GetUserByIdUseCase', () => {
  let getUserByIdUseCase: GetUserByIdUseCase;
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
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
      (usersRepository.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await getUserByIdUseCase.execute('1');

      expect(result).toEqual(mockUser);
      expect(usersRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should return null when user not found', async () => {
      (usersRepository.findById as jest.Mock).mockResolvedValue(null);

      const result = await getUserByIdUseCase.execute('1');

      expect(result).toBeNull();
      expect(usersRepository.findById).toHaveBeenCalledWith('1');
    });
  });
});
