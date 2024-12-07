import { CreateUserTaskDto } from './create-user-task.dto';

describe('CreateUserTaskDto', () => {
  it('should create a CreateUserTaskDto instance', () => {
    const id = '123';
    const createdAt = new Date();
    
    const dto = new CreateUserTaskDto(id, createdAt);

    expect(dto).toBeDefined();
    expect(dto.id).toBe(id);
    expect(dto.createdAt).toBe(createdAt);
  });
});
