import { Task } from './task.entity';

describe('Task', () => {
  describe('create', () => {
    it('should create a new task', () => {
      const task = Task.create('id', 'Test Task', 'Test Description');

      expect(task.id).toBe('id');
      expect(task.title).toBe('Test Task');
      expect(task.description).toBe('Test Description');
    });

    it('should create a task with null description', () => {
      const task = Task.create('id', 'Test Task', null);

      expect(task.id).toBe('id');
      expect(task.title).toBe('Test Task');
      expect(task.description).toBeNull();
    });
  });
});
