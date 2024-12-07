import { Test, TestingModule } from '@nestjs/testing';
import { UserTasksService } from '@tasks/application';

import { UserTasksResolver } from './user-tasks.resolver';

describe('UserTasksResolver', () => {
  let resolver: UserTasksResolver;
  let service: UserTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserTasksResolver,
        {
          provide: UserTasksService,
          useValue: {
            findMany: jest.fn(),
            createSome: jest.fn(),
            updateSome: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserTasksResolver>(UserTasksResolver);
    service = module.get<UserTasksService>(UserTasksService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findUserTasks', () => {
    it('should return user tasks for given userId and range', async () => {
      const userId = 'test-user-id';
      const range = { from: new Date(), to: new Date() };
      const result = await resolver.findUserTasks(userId, range);
      expect(service.findMany).toHaveBeenCalledWith(userId, range);
      expect(result).toEqual([]);
    });
  });

  describe('createUserTasks', () => {
    it('should create user tasks', async () => {
      const userId = 'test-user-id';
      const tasks = [{ id: 'task-1', createdAt: new Date() }];
      const result = await resolver.createUserTasks(userId, tasks);
      expect(service.createSome).toHaveBeenCalledWith(userId, tasks);
      expect(result).toBeDefined();
    });
  });

  describe('updateUserTasks', () => {
    it('should update user tasks', async () => {
      const userId = 'test-user-id';
      const userTasks = [{ id: 'user-task-1', updatedAt: new Date() }];
      const result = await resolver.updateUserTasks(userId, userTasks);
      expect(service.updateSome).toHaveBeenCalledWith(userId, userTasks);
      expect(result).toBeDefined();
    });
  });
});
