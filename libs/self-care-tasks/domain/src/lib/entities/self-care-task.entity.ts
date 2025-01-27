import { SelfCareTopic } from './self-care-topic.entity';

export type SelfCareTask = {
  id: string;
  name: string;
  description?: string;
  categories: SelfCareTopic[];
};
