import { Task } from './entities/task.entity';
import { UserTask } from './entities/user-task.entity';

export interface TaskRepository {
  findAllTasks(): Promise<Task[]>;
  findUserTasks(
    userId: string,
    range?: { from: Date; to: Date },
  ): Promise<Task[]>;
  createUserTasks(
    userId: string,
    tasks: { id: string; createdAt: Date }[],
  ): Promise<void>;
  updateUserTasks(
    userId: string,
    userTasks: { id: string; updatedAt: Date }[],
  ): Promise<void>;
}
