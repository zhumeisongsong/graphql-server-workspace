import { UserDto } from './user.dto';

describe('UserDto', () => {
  it('should create a new UserDto instance', () => {
    const id = '123';
    const name = 'Test User';
    const userDto = new UserDto(id, name);

    expect(userDto).toBeDefined();
    expect(userDto.id).toBe(id);
    expect(userDto.name).toBe(name);
  });
});
