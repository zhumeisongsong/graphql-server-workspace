import { Injectable } from '@nestjs/common';
import { Task, UserTask } from '@tasks/domain';

@Injectable()
export class TasksService {
  async findAll(): Promise<Task[]> {
    // TODO: Implement this
    return [];
  }

  async findUserTasks(
    userId: string,
    range?: { from: Date; to: Date },
  ): Promise<UserTask[]> {
    // TODO: Implement this
    return [];
  }

  async createUserTasks(
    userId: string,
    tasks: { id: string; createdAt: Date }[],
  ): Promise<string> {
    // TODO: Implement this
    return 'success';
  }

  async updateUserTasks(
    userId: string,
    userTasks: { id: string; updatedAt: Date }[],
  ): Promise<string> {
    // TODO: Implement this
    return 'success';
  }
}
