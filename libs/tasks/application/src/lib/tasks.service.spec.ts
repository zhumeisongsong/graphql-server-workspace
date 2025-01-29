import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TASKS_REPOSITORY, TasksRepository, Task } from '@tasks/domain';

describe('TasksService', () => {
  let service: TasksService;
  let mockTasksRepository: TasksRepository;

  beforeEach(async () => {
    mockTasksRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TASKS_REPOSITORY,
          useValue: mockTasksRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return all tasks', async () => {
      const mockTasks = [
        Task.create('task-1', 'Task 1', 'Description 1'),
        Task.create('task-2', 'Task 2', 'Description 2'),
      ];
      mockTasksRepository.findAll = jest.fn().mockResolvedValue(mockTasks);

      const result = await service.findAll();

      expect(result).toEqual(mockTasks);
      expect(mockTasksRepository.findAll).toHaveBeenCalled();
    });
  });
});
