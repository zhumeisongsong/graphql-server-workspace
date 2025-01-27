import { Injectable } from "@nestjs/common";
import { UserTasksService } from "../user-tasks.service";

@Injectable()
export class GenerateSomeUserTasksUseCase {
  constructor(private readonly userTasksService: UserTasksService) {}

  async execute(
    
  ): Promise<string> {
    return await this.userTasksService.updateSome(userId, userTasks);
  }
}
