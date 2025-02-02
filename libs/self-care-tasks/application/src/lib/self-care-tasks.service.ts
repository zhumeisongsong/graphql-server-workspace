import { AI_SERVICE, AIService } from '@ai/domain';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  SelfCareTask,
  SelfCareTopic,
  SelfCareUserTask,
} from '@self-care-tasks/domain';

@Injectable()
export class SelfCareTasksService {
  constructor(
    @Inject(AI_SERVICE)
    private aiService: AIService,
  ) {}
  async findMany(userId: string): Promise<SelfCareUserTask[]> {
    // TODO: Implement this
    return [];
  }

  async generateSome(
    selfCareTopics: SelfCareTopic[],
    count: number,
  ): Promise<SelfCareTask[]> {
    const prompt = this.buildPrompt(selfCareTopics, count);

    const response = await this.aiService.chat({
      messages: [{ role: 'user', content: prompt, timestamp: new Date() }],
      temperature: 0.7,
      json: true,
    });

    const selfCareTasks = response.content
      .split('\n')
      .map((task) => task.trim());

    if (selfCareTasks.length === 0) {
      throw new InternalServerErrorException(
        'Failed to generate self care tasks',
      );
    }

    return [];
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
