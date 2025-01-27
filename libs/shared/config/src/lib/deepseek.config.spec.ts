
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

  it('should load default configuration', () => {
    expect(() => deepseekConfig()).toThrow(z.ZodError);
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

  it('should throw error when API URL is empty', () => {
    process.env['DEEPSEEK_API_URL'] = '';
    process.env['DEEPSEEK_API_KEY'] = 'test-api-key';

    expect(() => deepseekConfig()).toThrow(z.ZodError);
  });

  it('should throw error when API key is empty', () => {
    process.env['DEEPSEEK_API_URL'] = 'https://api.deepseek.com';
    process.env['DEEPSEEK_API_KEY'] = '';

    expect(() => deepseekConfig()).toThrow(z.ZodError);
  });
});
