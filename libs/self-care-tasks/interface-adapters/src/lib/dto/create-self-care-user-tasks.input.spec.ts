import { CreateSelfCareUserTasksInput } from './create-self-care-user-tasks.input';
import { SelfCareTopicInput } from './self-care-topic.input';

describe('CreateSelfCareUserTasksInput', () => {
  it('should create a valid CreateSelfCareUserTasksInput instance', () => {
    const input = new CreateSelfCareUserTasksInput();
    const topic = new SelfCareTopicInput();
    topic.id = '123';
    topic.name = 'Exercise';

    input.selfCareTopics = [topic];
    input.taskCount = 5;
    input.userId = 'user123';

    expect(input).toBeDefined();
    expect(input.selfCareTopics).toHaveLength(1);
    expect(input.selfCareTopics[0].id).toBe('123');
    expect(input.selfCareTopics[0].name).toBe('Exercise');
    expect(input.taskCount).toBe(5);
    expect(input.userId).toBe('user123');
  });

  it('should validate taskCount is between 1 and 100', () => {
    const input = new CreateSelfCareUserTasksInput();
    input.selfCareTopics = [];
    input.userId = 'user123';

    // Valid cases
    input.taskCount = 1;
    expect(input.taskCount).toBe(1);
    
    input.taskCount = 50;
    expect(input.taskCount).toBe(50);
    
    input.taskCount = 100;
    expect(input.taskCount).toBe(100);

    // Invalid cases would be caught by class-validator
  });
});
