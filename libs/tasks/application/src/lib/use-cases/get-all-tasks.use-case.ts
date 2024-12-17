import { Injectable } from '@nestjs/common';
import { Task } from '@tasks/domain';

import { TasksService } from '../tasks.service';

@Injectable()
export class GetAllTasksUseCase {
  constructor(private readonly tasksService: TasksService) {}

  async execute(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }
}
