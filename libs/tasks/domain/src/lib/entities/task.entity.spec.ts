import { Task } from './task.entity';

describe('Task', () => {
  describe('create', () => {
    it('should create a new task', () => {
      const task = Task.create('id', 'Test Task', 'Test Description', [
        'category1',
        'category2',
      ]);

      expect(task.id).toBe('id');
      expect(task.title).toBe('Test Task');
      expect(task.description).toBe('Test Description');
      expect(task.categories).toEqual(['category1', 'category2']);
    });

    it('should create a task with null description', () => {
      const task = Task.create('id', 'Test Task', null, ['category1']);

      expect(task.id).toBe('id');
      expect(task.title).toBe('Test Task');
      expect(task.description).toBeNull();
      expect(task.categories).toEqual(['category1']);
    });

    it('should create a task with empty categories', () => {
      const task = Task.create('id', 'Test Task', 'Test Description', []);

      expect(task.id).toBe('id');
      expect(task.title).toBe('Test Task');
      expect(task.description).toBe('Test Description');
      expect(task.categories).toEqual([]);
    });
  });
});
