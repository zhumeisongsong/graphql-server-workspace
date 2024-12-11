import { TaskStatus } from './task-status.enum';

describe('TaskStatus', () => {
  it('should have TODO status', () => {
    expect(TaskStatus.TODO).toBe('TODO');
  });

  it('should have IN_PROGRESS status', () => {
    expect(TaskStatus.IN_PROGRESS).toBe('IN_PROGRESS');
  });

  it('should have DONE status', () => {
    expect(TaskStatus.DONE).toBe('DONE');
  });

  it('should be immutable', () => {
    // @ts-expect-error - Testing immutability
    expect(() => TaskStatus.TODO = 'SOMETHING_ELSE').toThrow();
  });
});
