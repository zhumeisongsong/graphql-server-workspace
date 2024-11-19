import { User } from './user.entity';

describe('User Entity', () => {
  it('should create a user with id and name', () => {
    const user = new User('1', 'John Doe');
    expect(user.id).toBe('1');
    expect(user.name).toBe('John Doe');
  });

  it('should allow updating the name', () => {
    const user = new User('1', 'John Doe');
    user.name = 'Jane Doe';
    expect(user.name).toBe('Jane Doe');
  });
});
