import { Test, TestingModule } from '@nestjs/testing';
import { GetAllTasksUseCase } from '@tasks/application';

import { TasksResolver } from './tasks.resolver';

describe('TasksResolver', () => {
  let resolver: TasksResolver;
  let getAllTasksUseCase: GetAllTasksUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksResolver,
        {
          provide: GetAllTasksUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    resolver = module.get<TasksResolver>(TasksResolver);
    getAllTasksUseCase = module.get<GetAllTasksUseCase>(GetAllTasksUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getTasks', () => {
    it('should return tasks', async () => {
      const mockTasks = [
        {
          id: 'task-1',
          title: 'Task 1',
          description: 'Description 1',
          categories: [],
        },
      ];

      jest.spyOn(getAllTasksUseCase, 'execute').mockResolvedValue(mockTasks);

      const result = await resolver.getTasks();
      expect(result).toEqual(mockTasks);
      expect(getAllTasksUseCase.execute).toHaveBeenCalled();
    });
  });
});
