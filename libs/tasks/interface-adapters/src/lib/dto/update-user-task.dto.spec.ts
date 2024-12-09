import { UpdateUserTaskDto } from './update-user-task.dto';

describe('UpdateUserTaskDto', () => {
  it('should create an UpdateUserTaskDto instance', () => {
    const id = '123';
    const updatedAt = new Date();
    
    const dto = new UpdateUserTaskDto(id, updatedAt);

    expect(dto).toBeDefined();
    expect(dto.id).toBe(id);
    expect(dto.updatedAt).toBe(updatedAt);
  });
});
