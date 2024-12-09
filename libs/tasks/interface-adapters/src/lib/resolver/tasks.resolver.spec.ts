import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '@tasks/application';

import { TasksResolver } from './tasks.resolver';

describe('TasksResolver', () => {
  let resolver: TasksResolver;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksResolver,
        {
          provide: TasksService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    resolver = module.get<TasksResolver>(TasksResolver);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAllTasks', () => {
    it('should return all tasks', async () => {
      const result = await resolver.getTasks();
      expect(result).toEqual([]);
    });
  });
});
