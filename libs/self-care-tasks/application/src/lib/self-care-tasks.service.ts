import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SelfCareTask, SelfCareTopic, SelfCareUserTask } from '@self-care-tasks/domain';

@Injectable()
export class SelfCareTasksService {
  constructor() {
    //TODO:  add ai service here
  }
  async findMany(userId: string): Promise<SelfCareUserTask[]> {
    // TODO: Implement this
    return [];
  }

  async generateSome(
    selfCareTopics: SelfCareTopic[],
    count: number,
  ): Promise<SelfCareTask[]> {
    const selfCareTasks: SelfCareTask[] = [];

    if (selfCareTasks.length === 0) {
      throw new InternalServerErrorException(
        'Failed to generate self care tasks',
      );
    }

    return selfCareTasks;
  }
}
