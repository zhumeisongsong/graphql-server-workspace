import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  SelfCareTask,
  SelfCareTopic,
  SelfCareUserTask,
} from '@self-care-tasks/domain';

export interface AIService {
  generateJsonResponse(prompt: string): Promise<unknown[]>;
}

@Injectable()
export class SelfCareTasksService {
  constructor(private readonly aiService: AIService) {}
  async findMany(userId: string): Promise<SelfCareUserTask[]> {
    // TODO: Implement this
    return [];
  }

  async generateSome(
    selfCareTopics: SelfCareTopic[],
    count: number,
  ): Promise<SelfCareTask[]> {
    const prompt = this.buildPrompt(selfCareTopics, count);

    const selfCareTasks: SelfCareTask[] = await this.aiService.generateJsonResponse(prompt);

    if (selfCareTasks.length === 0) {
      throw new InternalServerErrorException(
        'Failed to generate self care tasks',
      );
    }

    return selfCareTasks;
  }

  private buildPrompt(selfCareTopics: SelfCareTopic[], count: number): string {
    return `
    You are a mental health assistant. Please generate self care tasks based on the following conditions:
    1.topics: ${selfCareTopics.map((topic) => topic.name).join(', ')}
    2.task count: ${count}

    requirements:
    - response should be in English
    - response format: json
    - response should be an array of objects, each object should have the following properties:
      - name: string, should be a short name
      - description: string, should be a short description
    `;
  }
}
