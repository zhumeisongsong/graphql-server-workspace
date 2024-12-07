import { Injectable } from '@nestjs/common';
import { Task } from '@tasks/domain';

@Injectable()
export class TasksService {
  constructor() {}

  async findAll(): Promise<Task[]> {
    // TODO: Implement this
    return [];
  }
}
