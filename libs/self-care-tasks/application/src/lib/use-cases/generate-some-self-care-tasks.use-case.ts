import { Injectable } from '@nestjs/common';

import { SelfCareTasksService } from '../self-care-tasks.service';

@Injectable()
export class GenerateSomeSelfCareTasksUseCase {
  constructor(private readonly selfCareTasksService: SelfCareTasksService) {}

  async execute(
    selfCareTopics: {
      id: string;
      name: string;
    }[],
    count: number,
  ): Promise<[]> {
    return await this.selfCareTasksService.generateSome(selfCareTopics, count);
  }
}
