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
});
