import { Inject, Injectable } from '@nestjs/common';
import { Task, TASKS_REPOSITORY, TasksRepository } from '@tasks/domain';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASKS_REPOSITORY)
    private readonly tasksRepository: TasksRepository,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.tasksRepository.findAll();
  }
}
