import { Injectable } from '@nestjs/common';

@Injectable()
export class SelfCareTasksService {
  constructor() {}
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
    return [];
  }
}
