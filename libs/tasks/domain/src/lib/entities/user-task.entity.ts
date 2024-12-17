import { TaskStatus, TaskStatusEnum } from '../value-objects/task-status.enum';

export class UserTask {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly taskId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
    public readonly status: TaskStatus,
  ) {}

  /**
   * Creates a new user task
   */
  static create(id: string, userId: string, taskId: string): UserTask {
    return new UserTask(
      id,
      userId,
      taskId,
      new Date(),
      null,
      TaskStatusEnum.TODO,
    );
  }
}
