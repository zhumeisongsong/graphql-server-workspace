
import { z } from 'zod';
import { deepseekConfig } from './deepseek.config';

describe('deepseekConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });


  it('should load configuration from environment', () => {
    process.env['DEEPSEEK_API_URL'] = 'https://api.deepseek.com';
    process.env['DEEPSEEK_API_KEY'] = 'test-api-key';

    const config = deepseekConfig();

    expect(config).toEqual({
      apiUrl: 'https://api.deepseek.com',
      apiKey: 'test-api-key',
    });
  });
});
