import { UserDto } from './user.dto';

describe('UserDto', () => {
  it('should create a new UserDto instance', () => {
    const id = '123';
    const email = 'john@example.com';
    const firstName = 'John';
    const lastName = 'Doe';
    const userDto = new UserDto(id, email, firstName, lastName);

    expect(userDto).toBeDefined();
  });
});
