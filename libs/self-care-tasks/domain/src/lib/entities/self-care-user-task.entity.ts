import { TaskStatus } from '@tasks/domain';
import { User } from '@users/domain';

import { SelfCareTask } from './self-care-task.entity';
import { SelfCareTopic } from './self-care-topic.entity';

export interface SelfCareUserTask {
  id: string;
  taskId: string;
  task: SelfCareTask;
  userId: string;
  user: User;
  status: TaskStatus;
  createdAt: string;
  scheduledAt: string;
  updatedAt: string;
}
