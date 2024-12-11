import { TaskStatusEnum } from '../value-objects/task-status.enum';
import { UserTask } from './user-task.entity';

describe('UserTask', () => {
  describe('create', () => {
    it('should create a new user task with TODO status', () => {
      const task = UserTask.create('id', 'userId', 'taskId');
      
      expect(task.id).toBe('id');
      expect(task.userId).toBe('userId'); 
      expect(task.taskId).toBe('taskId');
      expect(task.status).toBe(TaskStatusEnum.TODO);
      expect(task.updatedAt).toBeNull();
      expect(task.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('markAsInProgress', () => {
    it('should mark task as in progress', () => {
      const task = UserTask.create('id', 'userId', 'taskId');
      const inProgressTask = task.markAsInProgress();

      expect(inProgressTask.status).toBe(TaskStatusEnum.IN_PROGRESS);
      expect(inProgressTask.updatedAt).toBeInstanceOf(Date);
    });

    it('should return same instance if already in progress', () => {
      const task = UserTask.create('id', 'userId', 'taskId');
      const inProgressTask = task.markAsInProgress();
      const sameTask = inProgressTask.markAsInProgress();

      expect(sameTask).toBe(inProgressTask);
    });
  });

  describe('markAsDone', () => {
    it('should mark task as done', () => {
      const task = UserTask.create('id', 'userId', 'taskId');
      const doneTask = task.markAsDone();

      expect(doneTask.status).toBe(TaskStatusEnum.DONE);
      expect(doneTask.updatedAt).toBeInstanceOf(Date);
    });

    it('should return same instance if already done', () => {
      const task = UserTask.create('id', 'userId', 'taskId');
      const doneTask = task.markAsDone();
      const sameTask = doneTask.markAsDone();

      expect(sameTask).toBe(doneTask);
    });
  });
});
