import { TaskDto } from './task.dto';

describe('TaskDto', () => {
  it('should create a TaskDto instance', () => {
    const id = '123';
    const title = 'Test Task';
    const description = 'Test Description';
    const categories = ['category1', 'category2'];

    const dto = new TaskDto(id, title, description, categories);

    expect(dto).toBeDefined();
    expect(dto.id).toBe(id);
    expect(dto.title).toBe(title); 
    expect(dto.description).toBe(description);
    expect(dto.categories).toEqual(categories);
  });

  it('should allow null description', () => {
    const id = '123';
    const title = 'Test Task';
    const description = null;
    const categories = ['category1'];

    const dto = new TaskDto(id, title, description, categories);

    expect(dto.description).toBeNull();
  });
});
