import { UserDto } from './user.dto';

describe('UserDto', () => {
  it('should create a new UserDto instance', () => {
    const id = '123';
    const firstName = 'Test';
    const lastName = 'User';
    const email = 'test@example.com';

    const userDto = new UserDto(id, firstName, lastName, email);

    expect(userDto).toBeDefined();
    expect(userDto.id).toBe(id);
    expect(userDto.firstName).toBe(firstName); 
    expect(userDto.lastName).toBe(lastName);
    expect(userDto.email).toBe(email);
  });
});
