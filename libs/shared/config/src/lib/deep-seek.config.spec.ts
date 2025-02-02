
import { z } from 'zod';
import { deepSeekConfig } from './deep-seek.config';

describe('deepSeekConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });


  it('should load configuration from environment', () => {
    process.env['DEEP_SEEK_API_URL'] = 'https://api.deepseek.com';
    process.env['DEEP_SEEK_API_KEY'] = 'test-api-key';

    const config = deepSeekConfig();

    expect(config).toEqual({
      apiUrl: 'https://api.deepseek.com',
      apiKey: 'test-api-key',
    });
  });
});
