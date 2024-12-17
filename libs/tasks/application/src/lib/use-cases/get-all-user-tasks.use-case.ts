import { Injectable } from "@nestjs/common";
import { UserTask } from "@tasks/domain";

import { UserTasksService } from "../user-tasks.service";

@Injectable()
export class GetAllUserTasksUseCase {
  constructor(private readonly userTasksService: UserTasksService) {}

  async execute(userId: string): Promise<UserTask[]> {
    return await this.userTasksService.findMany(userId);
  }
}
