import { authConfig } from './auth.config';

describe('authConfig', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should return the JWT secret from environment variable', () => {
    process.env['JWT_SECRET'] = 'test-secret';

    const config = authConfig();
    expect(config.secret).toBe('test-secret');
  });

  it('should throw error if JWT_SECRET is not set', () => {
    delete process.env['JWT_SECRET'];

    expect(() => authConfig()).toThrow();
  });
});
