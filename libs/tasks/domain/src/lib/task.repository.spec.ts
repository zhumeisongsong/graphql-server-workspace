import { Task } from './entities/task.entity';
import { UserTask } from './entities/user-task.entity';
import { User } from '@users/domain';
import { TaskRepository } from './task.repository';

describe('TaskRepository', () => {
  let mockTaskRepository: TaskRepository;
  let task: Task;
  let user: User;
  let userTask: UserTask;

  beforeEach(() => {
    task = new Task('task-1', 'Test Task', 'Description', ['category1']);
    user = new User('user-1', 'test@example.com', null, null);
    userTask = new UserTask(
      'user-task-1',
      new Date(),
      null,
      task.id,
      task,
      user.id,
      user
    );

    mockTaskRepository = {
      findAllTasks: jest.fn(),
      findUserTasks: jest.fn(),
      createUserTasks: jest.fn(),
      updateUserTasks: jest.fn()
    };
  });

  describe('findAllTasks', () => {
    it('should return all tasks', async () => {
      const tasks = [task];
      (mockTaskRepository.findAllTasks as jest.Mock).mockResolvedValue(tasks);

      const result = await mockTaskRepository.findAllTasks();

      expect(result).toEqual(tasks);
      expect(mockTaskRepository.findAllTasks).toHaveBeenCalled();
    });
  });

  describe('findUserTasks', () => {
    it('should return tasks for a specific user', async () => {
      const tasks = [task];
      (mockTaskRepository.findUserTasks as jest.Mock).mockResolvedValue(tasks);

      const result = await mockTaskRepository.findUserTasks(user.id);

      expect(result).toEqual(tasks);
      expect(mockTaskRepository.findUserTasks).toHaveBeenCalledWith(user.id);
    });
  });

  describe('createUserTasks', () => {
    it('should create user tasks', async () => {
      const tasks = [{
        id: 'task-1',
        createdAt: new Date()
      }];
      
      await mockTaskRepository.createUserTasks(user.id, tasks);

      expect(mockTaskRepository.createUserTasks).toHaveBeenCalledWith(user.id, tasks);
    });
  });

  describe('updateUserTasks', () => {
    it('should update user tasks', async () => {
      const userTasks = [{
        id: 'user-task-1',
        updatedAt: new Date()
      }];
      
      await mockTaskRepository.updateUserTasks(user.id, userTasks);

      expect(mockTaskRepository.updateUserTasks).toHaveBeenCalledWith(user.id, userTasks);
    });
  });
});
