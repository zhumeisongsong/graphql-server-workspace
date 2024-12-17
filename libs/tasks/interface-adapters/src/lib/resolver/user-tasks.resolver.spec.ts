import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import {
  GetAllUserTasksUseCase,
  CreateSomeUserTasksUseCase,
  UpdateSomeUserTasksUseCase,
} from '@tasks/application';
import { UserTaskDto } from '../dto/user-task.dto';
import { UserTasksResolver } from './user-tasks.resolver';
import { TaskStatusEnum } from '@tasks/domain';

describe('UserTasksResolver', () => {
  let resolver: UserTasksResolver;
  let getAllUserTasksUseCase: GetAllUserTasksUseCase;
  let createSomeUserTasksUseCase: CreateSomeUserTasksUseCase;
  let updateSomeUserTasksUseCase: UpdateSomeUserTasksUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTasksResolver,
        {
          provide: GetAllUserTasksUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: CreateSomeUserTasksUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue('success'),
          },
        },
        {
          provide: UpdateSomeUserTasksUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue('success'),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserTasksResolver>(UserTasksResolver);
    getAllUserTasksUseCase = module.get<GetAllUserTasksUseCase>(
      GetAllUserTasksUseCase,
    );
    createSomeUserTasksUseCase = module.get<CreateSomeUserTasksUseCase>(
      CreateSomeUserTasksUseCase,
    );
    updateSomeUserTasksUseCase = module.get<UpdateSomeUserTasksUseCase>(
      UpdateSomeUserTasksUseCase,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUserTasks', () => {
    it('should throw BadRequestException when userId is empty', async () => {
      await expect(resolver.getUserTasks('')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return user tasks for valid userId', async () => {
      const mockUserId = 'valid-user-id';
      const mockUserTasks = [
        {
          id: 'task-1',
          createdAt: new Date(),
          updatedAt: null,
          taskId: 'task-id-1',
          userId: mockUserId,
          status: TaskStatusEnum.TODO,
        },
      ];

      jest
        .spyOn(getAllUserTasksUseCase, 'execute')
        .mockResolvedValue(mockUserTasks);

      const result = await resolver.getUserTasks(mockUserId);
      expect(result).toEqual(
        mockUserTasks.map(
          (task) =>
            new UserTaskDto(
              task.id,
              task.createdAt,
              task.updatedAt,
              task.taskId,
              task.userId,
            ),
        ),
      );
    });
  });

  describe('createUserTasks', () => {
    it('should create user tasks successfully', async () => {
      const mockUserId = 'user-id';
      const mockTasks = [
        { taskId: 'task-id', createdAt: new Date(), id: 'task-id' },
      ];

      const result = await resolver.createUserTasks(mockUserId, mockTasks);
      expect(result).toBe('success');
      expect(createSomeUserTasksUseCase.execute).toHaveBeenCalledWith(
        mockUserId,
        mockTasks,
      );
    });
  });

  describe('updateUserTasks', () => {
    it('should update user tasks successfully', async () => {
      const mockUserId = 'user-id';
      const mockUserTasks = [
        {
          id: 'task-id',
          createdAt: new Date(),
          updatedAt: new Date(),
          taskId: 'task-id',
          userId: 'user-id',
        },
      ];

      const result = await resolver.updateUserTasks(mockUserId, mockUserTasks);
      expect(result).toBe('success');
      expect(updateSomeUserTasksUseCase.execute).toHaveBeenCalledWith(
        mockUserId,
        mockUserTasks,
      );
    });
  });
});
