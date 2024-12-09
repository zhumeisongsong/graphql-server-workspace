import { Task } from './entities/task.entity';

export interface TaskRepository {
  findAllTasks(): Promise<Task[]>;

  findUserTasks(
    userId: string,
    range?: { from: Date; to: Date },
  ): Promise<Task[]>;

  /**
   * Creates tasks for a specific user
   * @throws {TaskValidationError} If the tasks are invalid
   * @throws {UserNotFoundError} If user doesn't exist
   */
  createUserTasks(
    userId: string,
    tasks: { id: string; createdAt: Date }[],
  ): Promise<void>;

  /**
   * Updates existing user tasks
   * @throws {TaskNotFoundError} If any task doesn't exist
   * @throws {UserNotFoundError} If user doesn't exist
   */
  updateUserTasks(
    userId: string,
    userTasks: { id: string; updatedAt: Date }[],
  ): Promise<void>;
}
