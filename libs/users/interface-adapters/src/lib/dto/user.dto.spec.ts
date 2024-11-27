import { UserDto } from './user.dto';

describe('UserDto', () => {
  it('should create a new UserDto instance', () => {
    const id = '123';
    const email = 'john@example.com';
    const firstName = 'John';
    const lastName = 'Doe';
    const userDto = new UserDto(id, email, firstName, lastName);

    expect(userDto).toBeDefined();
    expect(userDto.id).toBe(id);
    expect(userDto.email).toBe(email);
    expect(userDto.firstName).toBe(firstName);
  });

  it('should handle empty firstName and lastName', () => {
    const id = '456';
    const email = 'jane@example.com';
    const userDto = new UserDto(id, email, null, null);

    expect(userDto).toBeDefined();
    expect(userDto.id).toBe(id);
    expect(userDto.email).toBe(email);
    expect(userDto.firstName).toBeUndefined();
    expect(userDto.lastName).toBeUndefined();
  });

  it('should handle special characters in names', () => {
    const id = '101';
    const email = 'test@example.com';
    const firstName = 'Jean-Pierre';
    const lastName = "O'Connor";
    const userDto = new UserDto(id, email, firstName, lastName);

    expect(userDto.firstName).toBe(firstName);
    expect(userDto.lastName).toBe(lastName);
  });
});
