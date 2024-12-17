import { Test } from '@nestjs/testing';
import { TaskStatusEnum, UserTask } from '@tasks/domain';
import { GetAllUserTasksUseCase } from './get-all-user-tasks.use-case';
import { UserTasksService } from '../user-tasks.service';

describe('GetAllUserTasksUseCase', () => {
  let useCase: GetAllUserTasksUseCase;
  let userTasksService: UserTasksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetAllUserTasksUseCase,
        {
          provide: UserTasksService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = moduleRef.get<GetAllUserTasksUseCase>(GetAllUserTasksUseCase);
    userTasksService = moduleRef.get<UserTasksService>(UserTasksService);
  });

  describe('execute', () => {
    it('should return all user tasks', async () => {
      const userId = 'test-user-id';
      const expectedTasks: UserTask[] = [
        {
          id: '1',
          userId,
          taskId: '1',
          createdAt: new Date('2024-01-01T00:00:00.000Z'),
          status: TaskStatusEnum.TODO,
          updatedAt: null,
        },
      ];

      jest.spyOn(userTasksService, 'findAll').mockResolvedValue(expectedTasks);

      const result = await useCase.execute(userId);

      expect(result).toBe(expectedTasks);
      expect(userTasksService.findAll).toHaveBeenCalledWith(userId);
    });
  });
});
