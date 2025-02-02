import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AIModule } from './ai.module';
import { AI_SERVICE } from '@ai/domain';
import { DeepSeekAdapter } from '@shared/infrastructure-deep-seek';

describe('AIModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AIModule]
    }).compile();

    expect(module).toBeDefined();
  });

  it('should provide AI_SERVICE using DeepSeekAdapter', async () => {
    const module = await Test.createTestingModule({
      imports: [AIModule, ConfigModule, HttpModule]
    }).compile();

    const aiService = module.get(AI_SERVICE);
    expect(aiService).toBeInstanceOf(DeepSeekAdapter);
  });
});
