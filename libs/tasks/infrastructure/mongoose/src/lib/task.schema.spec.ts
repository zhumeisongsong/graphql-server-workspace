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
});
