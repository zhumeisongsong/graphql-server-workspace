import { Test, TestingModule } from '@nestjs/testing';
import { UserTasksService } from '../user-tasks.service';
import { CreateSomeUserTasksUseCase } from './create-some-user-tasks.use-case';

describe('CreateSomeUserTasksUseCase', () => {
  let useCase: CreateSomeUserTasksUseCase;
  let userTasksService: UserTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSomeUserTasksUseCase,
        {
          provide: UserTasksService,
          useValue: {
            createSome: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateSomeUserTasksUseCase>(CreateSomeUserTasksUseCase);
    userTasksService = module.get<UserTasksService>(UserTasksService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create multiple user tasks', async () => {
      const userId = 'test-user-id';
      const tasks = [
        { id: '1', createdAt: new Date() },
        { id: '2', createdAt: new Date() },
      ];
      const expectedResult = 'success';

      jest.spyOn(userTasksService, 'createSome').mockResolvedValue(expectedResult);

      const result = await useCase.execute(userId, tasks);

      expect(result).toEqual(expectedResult);
      expect(userTasksService.createSome).toHaveBeenCalledWith(userId, tasks);
    });
  });
});
