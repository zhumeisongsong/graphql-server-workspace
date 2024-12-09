import { Task } from './entities/task.entity';
import { TasksRepository } from './tasks.repository';

class MockTasksRepository implements TasksRepository {
  async findAll(): Promise<Task[]> {
    return [];
  }
}

describe('TasksRepository', () => {
  let repository: TasksRepository;

  beforeEach(() => {
    repository = new MockTasksRepository();
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const tasks = await repository.findAll();
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks.every((task) => task instanceof Task)).toBe(true);
    });
  });
});
