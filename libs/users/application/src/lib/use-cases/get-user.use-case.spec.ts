import { GetUserUseCase } from './get-user.use-case';
import { UsersRepository } from '@users/domain';

describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase;
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn()
    };
    getUserUseCase = new GetUserUseCase(usersRepository);
  });

  describe('execute', () => {
    it('should return user when found', async () => {
      const mockUser = { id: '1',
       firstName: 'Test',
       lastName: 'User', 
       email: 'test@example.com'
       };
      (usersRepository.findById as jest.Mock).mockResolvedValue(mockUser);

      const result = await getUserUseCase.execute('1');

      expect(result).toEqual(mockUser);
      expect(usersRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should return null when user not found', async () => {
      (usersRepository.findById as jest.Mock).mockResolvedValue(null);

      const result = await getUserUseCase.execute('1');

      expect(result).toBeNull();
      expect(usersRepository.findById).toHaveBeenCalledWith('1');
    });
  });
});