import { databaseConfig } from './database.config';

describe('databaseConfig', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Clears the cache
    process.env = { ...OLD_ENV }; // Make a copy of the old environment
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('should return the correct database host and port from environment variables', () => {
    process.env['DATABASE_HOST'] = 'localhost';
    process.env['DATABASE_PORT'] = '3306';
    process.env['DATABASE_NAME'] = 'test-db';

    const config = databaseConfig();
    expect(config.host).toBe('localhost');
    expect(config.port).toBe(3306);
    expect(config.name).toBe('test-db');
  });

  it('should return the default port if DATABASE_PORT is not set', () => {
    process.env['DATABASE_HOST'] = 'localhost';
    delete process.env['DATABASE_PORT'];

    const config = databaseConfig();
    expect(config.host).toBe('localhost');
    expect(config.port).toBe(27017);
  });

  it('should return the correct database name from environment variables', () => {
    process.env['DATABASE_NAME'] = 'test-db';

    const config = databaseConfig();
    expect(config.name).toBe('test-db');
  });

  it('should return the default database name if DATABASE_NAME is not set', () => {
    delete process.env['DATABASE_NAME'];

    const config = databaseConfig();
    expect(config.name).toBe('main');
  });
});
