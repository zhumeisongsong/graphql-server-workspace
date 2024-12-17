import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks.service';
import { GetAllTasksUseCase } from './get-all-tasks.use-case';
import { Task } from '@tasks/domain';

describe('GetAllTasksUseCase', () => {
  let useCase: GetAllTasksUseCase;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllTasksUseCase,
        {
          provide: TasksService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<GetAllTasksUseCase>(GetAllTasksUseCase);
    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return all tasks', async () => {
      const expectedTasks: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          categories: ['category-1'],
        },
      ];

      jest.spyOn(tasksService, 'findAll').mockResolvedValue(expectedTasks);

      const result = await useCase.execute();

      expect(result).toEqual(expectedTasks);
      expect(tasksService.findAll).toHaveBeenCalled();
    });
  });
});
