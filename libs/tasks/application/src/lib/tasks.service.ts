import { Injectable } from '@nestjs/common';
import { Task, UserTask } from '@tasks/domain';

@Injectable()
export class TasksService {
  constructor() {}

  async findAll(): Promise<Task[]> {
    // TODO: Implement this
    return [];
  }

  async createUserTasks(userId: string, tasks: Task[]): Promise<string> {
    // TODO: Implement this
    return 'success';
  }

  async updateUserTasks(
    userId: string,
    userTasks: UserTask[],
  ): Promise<string> {
    // TODO: Implement this
    return 'success';
  }
}
