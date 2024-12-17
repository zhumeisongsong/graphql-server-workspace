import { UserTaskDto } from './user-task.dto';
import { TaskDto } from './task.dto';
import { UserDto } from '@users/interface-adapters';

describe('UserTaskDto', () => {
  it('should create a UserTaskDto instance', () => {
    const id = '123';
    const createdAt = new Date();
    const updatedAt = new Date();
    const taskId = '456';
    const userId = '789';

    const userTaskDto = new UserTaskDto(
      id,
      createdAt,
      updatedAt,
      taskId,
      userId
    );

    expect(userTaskDto.id).toBe(id);
    expect(userTaskDto.createdAt).toBe(createdAt);
    expect(userTaskDto.updatedAt).toBe(updatedAt);
    expect(userTaskDto.taskId).toBe(taskId);
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
      userId
    );

    expect(userTaskDto.id).toBe(id);
    expect(userTaskDto.createdAt).toBe(createdAt);
    expect(userTaskDto.updatedAt).toBeNull();
    expect(userTaskDto.taskId).toBe(taskId);
    expect(userTaskDto.userId).toBe(userId);
  });
});
