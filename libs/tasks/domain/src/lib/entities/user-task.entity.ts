import { User } from '@users/domain';

import { Task } from './task.entity';

export class UserTask {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
    public readonly taskId: string,
    public readonly task: Task | null,
    public readonly userId: string,
    public readonly user: User | null,
  ) {}
}
