import { Test, TestingModule } from '@nestjs/testing';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const result = await service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findUserTasks', () => {
    it('should return an array of user tasks', async () => {
      const result = await service.findUserTasks('123');
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('createUserTasks', () => {
    it('should create user tasks and return success', async () => {
      const userId = '123';
      const tasks = [{ id: '3', createdAt: new Date() }];
      const result = await service.createUserTasks(userId, tasks);
      expect(result).toBe('success');
    });
  });

  describe('updateUserTasks', () => {
    it('should update user tasks and return success', async () => {
      const userId = '123';
      const userTasks = [
        {
          id: 'user-task-1',
          updatedAt: new Date(),
        },
      ];
      const result = await service.updateUserTasks(userId, userTasks);
      expect(result).toBe('success');
    });
  });
});
