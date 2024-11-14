import { UserRepository } from './user.repository';
import { User } from './user.entity';

class MockUserRepository implements UserRepository {
  private users: User[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' },
  ];

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }
}

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
  });

  test('findById should return a user by id', async () => {
    const user = await userRepository.findById('1');
    expect(user).toEqual({ id: '1', name: 'John Doe' });
  });

  test('findById should return null if user not found', async () => {
    const user = await userRepository.findById('3');
    expect(user).toBeNull();
  });

});
