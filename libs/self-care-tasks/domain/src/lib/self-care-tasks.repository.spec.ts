import { SelfCareTask } from './entities/self-care-task.entity';
import { SelfCareTopic } from './entities/self-care-topic.entity';
import { SelfCareTasksRepository } from './self-care-tasks.repository';

describe('SelfCareTasksRepository', () => {
  let repository: SelfCareTasksRepository;

  describe('generateSome', () => {
    it('should generate the requested number of tasks', async () => {
      const topics: SelfCareTopic[] = [
        { id: '1', name: 'Physical' },
        { id: '2', name: 'Mental' }
      ];
      const count = 3;

      const tasks = await repository.generateSome(topics, count);

      expect(tasks).toHaveLength(count);
      tasks.forEach(task => {
        expect(task).toMatchObject({
          id: expect.any(String),
          name: expect.any(String),
          categories: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              name: expect.any(String)
            })
          ])
        });
      });
    });

    it('should include provided topics in generated tasks', async () => {
      const topics: SelfCareTopic[] = [
        { id: '1', name: 'Physical' },
        { id: '2', name: 'Mental' }
      ];

      const tasks = await repository.generateSome(topics, 1);

      tasks.forEach(task => {
        expect(task.categories).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.stringMatching(/1|2/),
              name: expect.stringMatching(/Physical|Mental/)
            })
          ])
        );
      });
    });
  });
});
