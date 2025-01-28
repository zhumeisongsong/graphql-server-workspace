import { TaskDto } from './task.dto';

describe('TaskDto', () => {
  it('should create a TaskDto instance', () => {
    const id = '123';
    const title = 'Test Task';
    const description = 'Test Description';

    const dto = new TaskDto(id, title, description);

    expect(dto).toBeDefined();
    expect(dto.id).toBe(id);
    expect(dto.title).toBe(title); 
    expect(dto.description).toBe(description);
  });

  it('should allow null description', () => {
    const id = '123';
    const title = 'Test Task';
    const description = null;

    const dto = new TaskDto(id, title, description);

    expect(dto.description).toBeNull();
  });
});
