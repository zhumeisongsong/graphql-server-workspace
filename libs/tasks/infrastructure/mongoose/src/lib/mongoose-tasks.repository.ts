import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TasksRepository } from '@tasks/domain';
import { Model } from 'mongoose';

import { TaskDocument } from './task.schema';

@Injectable()
export class MongooseTasksRepository implements TasksRepository {
  constructor(
    @InjectModel(TaskDocument.name) private taskModel: Model<TaskDocument>,
  ) {}

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();

    if (!tasks) {
      return [];
    }

    return tasks.map((task) =>
      Task.create(task.id, task.title, task.description, task.categories),
    );
  }
}
