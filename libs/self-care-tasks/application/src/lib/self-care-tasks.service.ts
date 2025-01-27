import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class SelfCareTasksService {
  constructor() {
    //TODO:  add ai service here
  }
  async findMany(userId: string): Promise<[]> {
    // TODO: Implement this
    return [];
  }

  async generateSome(
    selfCareTopics: {
      id: string;
      name: string;
    }[],
    count: number,
  ): Promise<[]> {
    const selfCareTasks: [] = [];

    if (selfCareTasks.length === 0) {
      throw new InternalServerErrorException(
        'Failed to generate self care tasks',
      );
    }

    return selfCareTasks;
  }
}
