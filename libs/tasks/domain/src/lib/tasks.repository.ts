import { Task } from './entities/task.entity';

export interface TasksRepository {
  findAll(): Promise<Task[]>;
}

export const TASKS_REPOSITORY = Symbol('TASKS_REPOSITORY');
