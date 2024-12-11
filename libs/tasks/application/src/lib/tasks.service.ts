import { Injectable } from '@nestjs/common';
import { Task } from '@tasks/domain';

import { GetAllTasksUseCase } from './use-cases/get-all-tasks.use-case';

@Injectable()
export class TasksService {
  constructor(private readonly getAllTasksUseCase: GetAllTasksUseCase) {}

  async findAll(): Promise<Task[]> {
    return await this.getAllTasksUseCase.execute();
  }
}
