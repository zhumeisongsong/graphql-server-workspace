import { Task } from './entities/task.entity';
import { UserTasksRepository } from './user-tasks-repository.interface';

class MockUserTasksRepository implements UserTasksRepository {
  async findAll(userId: string): Promise<Task[]> {
    return [];
  }

  async createSome(
    userId: string,
    tasks: { id: string; createdAt: Date }[],
  ): Promise<void> {
    return;
  }

  async updateSome(
    userId: string,
    tasks: { id: string; updatedAt: Date }[],
  ): Promise<void> {
    return;
  }
}

describe('UserTasksRepository', () => {
  let repository: UserTasksRepository;

  beforeEach(() => {
    repository = new MockUserTasksRepository();
  });

  describe('findAll', () => {
    it('should return all tasks for a given user', async () => {
      const tasks = await repository.findAll('user-1');
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.every((task) => task instanceof Task)).toBe(true);
    });
  });

  describe('createSome', () => {
    it('should create multiple tasks for a user', async () => {
      const tasksToCreate = [
        { id: 'task-1', createdAt: new Date() },
        { id: 'task-2', createdAt: new Date() },
      ];
      await expect(
        repository.createSome('user-1', tasksToCreate),
      ).resolves.not.toThrow();
    });
  });

  describe('updateSome', () => {
    it('should update multiple existing tasks', async () => {
      const tasksToUpdate = [
        { id: 'task-1', updatedAt: new Date() },
        { id: 'task-2', updatedAt: new Date() },
      ];
      await expect(
        repository.updateSome('user-1', tasksToUpdate),
      ).resolves.not.toThrow();
    });
  });
});
