import { User } from './user.entity';

describe('User Entity', () => {
  it('should create a user with all required properties', () => {
    const user = new User(
      'test-id',
      'John',
      'Doe',
      'john@example.com',
      'password123',
    );

    expect(user.id).toBe('test-id');
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.password).toBe('password123');
  });

  it('should have all properties as defined in the constructor', () => {
    const userData = {
      id: 'user-123',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'securepass',
    };

    const user = new User(
      userData.id,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
    );

    expect(user).toEqual(userData);
  });
});
