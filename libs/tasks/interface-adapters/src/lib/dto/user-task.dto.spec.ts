import { UserTaskDto } from './user-task.dto';
import { TaskDto } from './task.dto';
import { UserDto } from '@users/interface-adapters';

describe('UserTaskDto', () => {
  it('should create a UserTaskDto instance', () => {
    const id = '123';
    const createdAt = new Date();
    const updatedAt = new Date();
    const taskId = '456';
    const task = new TaskDto('456', 'Test Task', 'Test Description', []);
    const userId = '789';
    const user = new UserDto('789', 'test@example.com', null, null);

    const userTaskDto = new UserTaskDto(
      id,
      createdAt,
      updatedAt,
      taskId,
      task,
      userId
    );

    expect(userTaskDto.id).toBe(id);
    expect(userTaskDto.createdAt).toBe(createdAt);
    expect(userTaskDto.updatedAt).toBe(updatedAt);
    expect(userTaskDto.taskId).toBe(taskId);
    expect(userTaskDto.task).toBe(task);
    expect(userTaskDto.userId).toBe(userId);
  });

  it('should create a UserTaskDto instance with null values', () => {
    const id = '123';
    const createdAt = new Date();
    const updatedAt = null;
    const taskId = '456';
    const task = null;
    const userId = '789';
    const user = null;

    const userTaskDto = new UserTaskDto(
      id,
      createdAt,
      updatedAt,
      taskId,
      task,
      userId
    );

    expect(userTaskDto.id).toBe(id);
    expect(userTaskDto.createdAt).toBe(createdAt);
    expect(userTaskDto.updatedAt).toBeNull();
    expect(userTaskDto.taskId).toBe(taskId);
    expect(userTaskDto.task).toBeNull();
    expect(userTaskDto.userId).toBe(userId);
  });
});
