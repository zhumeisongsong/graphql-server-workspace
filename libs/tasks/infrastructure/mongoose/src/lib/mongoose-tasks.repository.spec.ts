import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '@tasks/domain';

import { TaskDocument } from './task.schema';
import { MongooseTasksRepository } from './mongoose-tasks.repository';

describe('MongooseTasksRepository', () => {
  let repository: MongooseTasksRepository;
  let taskModel: Model<TaskDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongooseTasksRepository,
        {
          provide: getModelToken(TaskDocument.name),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<MongooseTasksRepository>(MongooseTasksRepository);
    taskModel = module.get<Model<TaskDocument>>(getModelToken(TaskDocument.name));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return empty array when no tasks exist', async () => {
      jest.spyOn(taskModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      } as any);

      const result = await repository.findAll();
      expect(result).toEqual([]);
    });

    it('should return array of Tasks when found', async () => {
      const mockTasks = [
        {
          id: '123',
          title: 'Test Task',
          description: 'Test Description',
        },
        {
          id: '456',
          title: 'Another Task',
          description: null,
        },
      ];

      jest.spyOn(taskModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTasks),
      } as any);

      const result = await repository.findAll();
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Task);
      expect(result[0].id).toBe(mockTasks[0].id);
      expect(result[0].title).toBe(mockTasks[0].title);
      expect(result[0].description).toBe(mockTasks[0].description);

      expect(result[1]).toBeInstanceOf(Task);
      expect(result[1].id).toBe(mockTasks[1].id);
      expect(result[1].title).toBe(mockTasks[1].title);
      expect(result[1].description).toBe(mockTasks[1].description);
    });
  });
});
