import { SelfCareTask } from './entities/self-care-task.entity';
import { SelfCareTopic } from './entities/self-care-topic.entity';

export interface SelfCareTasksRepository {
  generateSome(
    selfCareTopics: SelfCareTopic[],
    count: number,
  ): Promise<SelfCareTask[]>;
}

export const SELF_CARE_TASKS_REPOSITORY = Symbol('SELF_CARE_TASKS_REPOSITORY');
