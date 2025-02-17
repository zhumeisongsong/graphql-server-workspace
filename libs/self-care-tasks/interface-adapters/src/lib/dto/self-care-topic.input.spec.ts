import { SelfCareTopicInput } from './self-care-topic.input';

describe('SelfCareTopicInput', () => {
  it('should create a valid SelfCareTopicInput instance', () => {
    const input = new SelfCareTopicInput();
    input.id = '123';
    input.name = 'Exercise';

    expect(input).toBeDefined();
    expect(input.id).toBe('123');
    expect(input.name).toBe('Exercise');
  });

  it('should have the correct field decorators', () => {
    const metadata = Reflect.getMetadata('graphql:field_names', SelfCareTopicInput.prototype);
    expect(metadata).toContain('id');
    expect(metadata).toContain('name');
  });
});
