import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { GetAllTasksUseCase } from './use-cases/get-all-tasks.use-case';

describe('TasksService', () => {
  let service: TasksService;
  let getAllTasksUseCase: GetAllTasksUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: GetAllTasksUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    getAllTasksUseCase = module.get<GetAllTasksUseCase>(GetAllTasksUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
