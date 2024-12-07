import { Task } from './task.entity';

describe('Task', () => {
  it('should create a task with all properties', () => {
    const task = new Task(
      'test-id',
      'Test Title',
      'Test Description',
      ['category1', 'category2']
    );

    expect(task.id).toBe('test-id');
    expect(task.title).toBe('Test Title'); 
    expect(task.description).toBe('Test Description');
    expect(task.categories).toEqual(['category1', 'category2']);
  });

  it('should allow null description', () => {
    const task = new Task(
      'test-id',
      'Test Title',
      null,
      ['category1']
    );

    expect(task.description).toBeNull();
  });

  it('should create a task with empty categories array', () => {
    const task = new Task(
      'test-id',
      'Test Title',
      'Test Description',
      []
    );

    expect(task.categories).toEqual([]);
  });
});
