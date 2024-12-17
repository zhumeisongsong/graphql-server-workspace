import { Injectable } from '@nestjs/common';
import { UserTasksService } from '../user-tasks.service';

@Injectable()
export class CreateSomeUserTasksUseCase {
  constructor(private readonly userTasksService: UserTasksService) {}

  async execute(
    userId: string,
    tasks: { id: string; createdAt: Date }[],
  ): Promise<string> {
    return await this.userTasksService.createSome(userId, tasks);
  }
}
