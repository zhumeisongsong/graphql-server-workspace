import { User } from './user.entity';

describe('User Entity', () => {
  it('should create a user with all required fields', () => {
    const user = new User('123', 'test@example.com', 'John', 'Doe');

    expect(user.id).toBe('123');
    expect(user.email).toBe('test@example.com'); 
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
  });

  it('should allow updating first name', () => {
    const user = new User('123', 'test@example.com', 'John', 'Doe');
    user.firstName = 'Jane';
    expect(user.firstName).toBe('Jane');
  });

  it('should allow updating last name', () => {
    const user = new User('123', 'test@example.com', 'John', 'Doe');
    user.lastName = 'Smith';
    expect(user.lastName).toBe('Smith');
  });

  it('should allow updating first name and last name', () => {
    const user = new User('123', 'test@example.com', 'John', 'Doe');
    user.firstName = 'Jane';
    user.lastName = 'Smith';
    expect(user.firstName).toBe('Jane');
    expect(user.lastName).toBe('Smith');
  });

  it('should allow null values for first name and last name', () => {
    const user = new User('123', 'test@example.com', null, null);
    expect(user.firstName).toBeNull();
    expect(user.lastName).toBeNull();
  });

  it('should allow setting first name and last name to null', () => {
    const user = new User('123', 'test@example.com', 'John', 'Doe');
    user.firstName = null;
    user.lastName = null;
    expect(user.firstName).toBeNull(); 
    expect(user.lastName).toBeNull();
  });
});
