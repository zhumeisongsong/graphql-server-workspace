import { Injectable } from '@nestjs/common';
import { UserTasksService } from '../user-tasks.service';

@Injectable()
export class UpdateSomeUserTasksUseCase {
  constructor(private readonly userTasksService: UserTasksService) {}

  async execute(
    userId: string,
    userTasks: { id: string; updatedAt: Date }[],
  ): Promise<string> {
    return await this.userTasksService.updateSome(userId, userTasks);
  }
}
