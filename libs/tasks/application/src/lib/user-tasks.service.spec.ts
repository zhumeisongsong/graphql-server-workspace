import { Test, TestingModule } from '@nestjs/testing';
import { UserTasksService } from './user-tasks.service';

describe('UserTasksService', () => {
  let service: UserTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTasksService],
    }).compile();

    service = module.get<UserTasksService>(UserTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('should return user tasks', async () => {
      const result = await service.findMany('userId');
      expect(result).toEqual([]);
    });
  });

  describe('createSome', () => {
    it('should create user tasks', async () => {
      const result = await service.createSome('userId', [{ id: '1', createdAt: new Date() }]);
      expect(result).toEqual('success');
    });
  });

  describe('updateSome', () => {
    it('should update user tasks', async () => {
      const result = await service.updateSome('userId', [{ id: '1', updatedAt: new Date() }]);
      expect(result).toEqual('success');
    });
  });
});
