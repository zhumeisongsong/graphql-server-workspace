import { UsersRepository } from './users.repository';
import { User } from './user.entity';

class MockUsersRepository implements UsersRepository {
  private users: User[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' },
  ];

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }
}

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = new MockUsersRepository();
  });

  test('findById should return a user by id', async () => {
    const user = await usersRepository.findById('1');
    expect(user).toEqual({ id: '1', name: 'John Doe' });
  });

  test('findById should return null if user not found', async () => {
    const user = await usersRepository.findById('3');
    expect(user).toBeNull();
  });
});
