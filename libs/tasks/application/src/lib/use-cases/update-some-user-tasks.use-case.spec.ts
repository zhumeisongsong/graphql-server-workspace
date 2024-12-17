import { Test, TestingModule } from '@nestjs/testing';
import { UserTasksService } from '../user-tasks.service';
import { UpdateSomeUserTasksUseCase } from './update-some-user-tasks.use-case';

describe('UpdateSomeUserTasksUseCase', () => {
  let useCase: UpdateSomeUserTasksUseCase;
  let userTasksService: UserTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateSomeUserTasksUseCase,
        {
          provide: UserTasksService,
          useValue: {
            updateSome: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<UpdateSomeUserTasksUseCase>(UpdateSomeUserTasksUseCase);
    userTasksService = module.get<UserTasksService>(UserTasksService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should update multiple user tasks', async () => {
      const userId = 'test-user-id';
      const userTasks = [
        { id: '1', updatedAt: new Date() },
        { id: '2', updatedAt: new Date() },
      ];
      const expectedResult = 'success';

      jest.spyOn(userTasksService, 'updateSome').mockResolvedValue(expectedResult);

      const result = await useCase.execute(userId, userTasks);

      expect(result).toEqual(expectedResult);
      expect(userTasksService.updateSome).toHaveBeenCalledWith(userId, userTasks);
    });
  });
});
