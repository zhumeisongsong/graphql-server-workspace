import { GetUserUseCase } from './get-user.use-case';
import { UsersRepository } from '@users/domain';

describe('GetUserUseCase', () => {
  let getUserUseCase: GetUserUseCase;
  let usersRepository: jest.Mocked<UsersRepository>;

  beforeEach(() => {
    usersRepository = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<UsersRepository>;

    getUserUseCase = new GetUserUseCase(usersRepository);
  });

  describe('execute', () => {
    it('should return a user when found', async () => {
      const user = { id: '1', name: 'John Doe' };
      usersRepository.findById.mockResolvedValue(user);

      const result = await getUserUseCase.execute('1');

      expect(result).toEqual(user);
      expect(usersRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should return null when user is not found', async () => {
      usersRepository.findById.mockResolvedValue(null);

      const result = await getUserUseCase.execute('1');

      expect(result).toBeNull();
      expect(usersRepository.findById).toHaveBeenCalledWith('1');
    });
  });
});