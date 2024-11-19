import { GetUserUseCase } from './get-user.use-case';
import { UserRepository } from '@users/domain';

describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    getUserUseCase = new GetUserUseCase(userRepository);
  });

  describe('execute', () => {
    it('should return a user when found', async () => {
      const user = { id: '1', name: 'John Doe' };
      userRepository.findById.mockResolvedValue(user);

      const result = await getUserUseCase.execute('1');

      expect(result).toEqual(user);
      expect(userRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should return null when user is not found', async () => {
      userRepository.findById.mockResolvedValue(null);

      const result = await getUserUseCase.execute('1');

      expect(result).toBeNull();
      expect(userRepository.findById).toHaveBeenCalledWith('1');
    });
  });
});