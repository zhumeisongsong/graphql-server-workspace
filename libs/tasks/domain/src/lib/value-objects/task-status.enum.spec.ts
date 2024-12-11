import { TaskStatusEnum } from './task-status.enum';

describe('TaskStatus', () => {
  it('should have TODO status', () => {
    expect(TaskStatusEnum.TODO).toBe('TODO');
  });

  it('should have IN_PROGRESS status', () => {
    expect(TaskStatusEnum.IN_PROGRESS).toBe('IN_PROGRESS');
  });

  it('should have DONE status', () => {
    expect(TaskStatusEnum.DONE).toBe('DONE');
  });

  it('should be immutable', () => {
    // @ts-expect-error - Testing immutability
    expect(() => TaskStatus.TODO = 'SOMETHING_ELSE').toThrow();
  });
});
