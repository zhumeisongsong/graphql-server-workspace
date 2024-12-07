import { User } from '@users/domain';
import { Task } from './task.entity';
import { UserTask } from './user-task.entity';

describe('UserTask', () => {
  it('should create a user task instance', () => {
    const task = new Task('task-1', 'Test Task', 'Description', ['category1']);
    const user = new User('user-1', 'test@example.com', null, null);
    const now = new Date();

    const userTask = new UserTask(
      'user-task-1',
      now,
      null,
      'task-1',
      task,
      'user-1',
      user,
    );

    expect(userTask).toBeDefined();
    expect(userTask.id).toBe('user-task-1');
    expect(userTask.createdAt).toBe(now);
    expect(userTask.updatedAt).toBeNull();
    expect(userTask.taskId).toBe('task-1');
    expect(userTask.task).toBe(task);
    expect(userTask.userId).toBe('user-1');
    expect(userTask.user).toBe(user);
  });
});
