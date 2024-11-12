import {type DailyPromptRecordEntity } from './daily-prompt-record-entity';

describe('DailyPromptRecordEntity', () => {
  it('should have all required properties', () => {
    const record: DailyPromptRecordEntity = {
      id: '1',
      promptId: 'prompt1',
      userId: 'user1',
      createdAt: new Date(),
      completedAt: new Date(),
    };

    expect(record).toHaveProperty('id');
    expect(record).toHaveProperty('promptId');
    expect(record).toHaveProperty('userId');
    expect(record).toHaveProperty('createdAt');
    expect(record).toHaveProperty('completedAt');
  });

  it('should have correct types for properties', () => {
    const record: DailyPromptRecordEntity = {
      id: '1',
      promptId: 'prompt1',
      userId: 'user1',
      createdAt: new Date(),
      completedAt: new Date(),
    };

    expect(typeof record.id).toBe('string');
    expect(typeof record.promptId).toBe('string');
    expect(typeof record.userId).toBe('string');
    expect(record.createdAt).toBeInstanceOf(Date);
    expect(record.completedAt).toBeInstanceOf(Date);
  });
});
