import { SelfCareTopic } from './self-care-topic.entity';

describe('SelfCareTopic', () => {
  it('should match the interface', () => {
    const topic: SelfCareTopic = {
      id: '123',
      name: 'Exercise'
    };

    expect(topic.id).toBeDefined();
    expect(topic.name).toBeDefined();
  });
});
