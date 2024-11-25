import { UsersRepository } from './users.repository';
import { User } from './user.entity';

class MockUsersRepository implements UsersRepository {
  private users: User[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith', 
      email: 'jane@example.com',
      password: 'password456'
    }
  ];

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }
}

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = new MockUsersRepository();
  });

  test('findById should return a user by id', async () => {
    const user = await usersRepository.findById('1');
    expect(user).toEqual({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123'
    });
  });

  test('findById should return null if user not found', async () => {
    const user = await usersRepository.findById('3');
    expect(user).toBeNull();
  });
});
