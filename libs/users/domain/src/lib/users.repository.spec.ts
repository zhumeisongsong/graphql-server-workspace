import { UsersRepository } from './users.repository';
import { User } from './user.entity';

class MockUsersRepository implements UsersRepository {
  private users: User[] = [
    { id: '1', email: 'john@example.com', firstName: 'John', lastName: 'Doe' },
    {
      id: '2',
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
    },
  ];

  async findOneById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }
}

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;

  beforeEach(() => {
    usersRepository = new MockUsersRepository();
  });

  test('findOneById should return a user by id', async () => {
    const user = await usersRepository.findOneById('1');
    expect(user).toEqual({
      id: '1',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  test('findOneById should return null if user not found', async () => {
    const user = await usersRepository.findOneById('3');
    expect(user).toBeNull();
  });

  test('findOneByEmail should return a user by email', async () => {
    const user = await usersRepository.findOneByEmail('jane@example.com');
    expect(user).toEqual({
      id: '2',
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
    });
  });

  test('findOneByEmail should return null if user not found', async () => {
    const user = await usersRepository.findOneByEmail('nonexistent@example.com');
    expect(user).toBeNull();
  });
});
