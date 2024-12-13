import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDocument } from './task.schema';

describe('TaskDocument', () => {
  let taskModel: Model<TaskDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(TaskDocument.name),
          useValue: Model,
        },
      ],
    }).compile();

    taskModel = module.get<Model<TaskDocument>>(
      getModelToken(TaskDocument.name),
    );
  });

  it('should be defined', () => {
    expect(taskModel).toBeDefined();
  });

  it('should create a task with required fields', () => {
    const task = new taskModel({
      title: 'Test Task',
      categories: ['test'],
    });
    expect(task.title).toBe('Test Task');
    expect(task.categories).toEqual(['test']);
    expect(task.description).toBeNull();
  });

  it('should create a task with all fields', () => {
    const task = new taskModel({
      title: 'Test Task',
      description: 'Test Description',
      categories: ['test', 'example'],
    });
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Test Description');
    expect(task.categories).toEqual(['test', 'example']);
  });
});
