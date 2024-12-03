import { awsConfig } from './aws.config';

describe('awsConfig', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should return AWS config from environment variables', () => {
    process.env['AWS_REGION'] = 'us-east-1';
    process.env['AWS_ACCESS_KEY_ID'] = 'test-key-id';
    process.env['AWS_SECRET_ACCESS_KEY'] = 'test-secret-key';

    const config = awsConfig();
    expect(config).toEqual({
      region: 'us-east-1',
      accessKeyId: 'test-key-id',
      secretAccessKey: 'test-secret-key',
    });
  });

  it('should throw error if AWS_REGION is not set', () => {
    process.env['AWS_ACCESS_KEY_ID'] = 'test-key-id';
    process.env['AWS_SECRET_ACCESS_KEY'] = 'test-secret-key';
    delete process.env['AWS_REGION'];

    expect(() => awsConfig()).toThrow();
  });

  it('should throw error if AWS_ACCESS_KEY_ID is not set', () => {
    process.env['AWS_REGION'] = 'us-east-1';
    process.env['AWS_SECRET_ACCESS_KEY'] = 'test-secret-key';
    delete process.env['AWS_ACCESS_KEY_ID'];

    expect(() => awsConfig()).toThrow();
  });

  it('should throw error if AWS_SECRET_ACCESS_KEY is not set', () => {
    process.env['AWS_REGION'] = 'us-east-1';
    process.env['AWS_ACCESS_KEY_ID'] = 'test-key-id';
    delete process.env['AWS_SECRET_ACCESS_KEY'];

    expect(() => awsConfig()).toThrow();
  });
});
