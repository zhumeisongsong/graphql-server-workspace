import { Task } from './entities/task.entity';
import { UserTask } from './entities/user-task.entity';

export interface TaskRepository {
  findAllTasks(): Promise<Task[]>;
  findUserTasks(userId: string): Promise<Task[]>;
  createUserTasks(userId: string, tasks: Task[]): Promise<void>;
  updateUserTasks(userId: string, userTasks: UserTask[]): Promise<void>;
}
