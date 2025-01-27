import { Injectable } from '@nestjs/common';
import { SelfCareTask, SelfCareTopic } from '@self-care-tasks/domain';

import { SelfCareTasksService } from '../self-care-tasks.service';

@Injectable()
export class GenerateSomeSelfCareTasksUseCase {
  constructor(private readonly selfCareTasksService: SelfCareTasksService) {}

  async execute(
    selfCareTopics: SelfCareTopic[],
    count: number,
  ): Promise<SelfCareTask[]> {
    return await this.selfCareTasksService.generateSome(selfCareTopics, count);
  }
}
