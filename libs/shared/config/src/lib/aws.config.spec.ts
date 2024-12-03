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

  it('should return aws configuration with environment variables', () => {
    // Arrange
    process.env['AWS_REGION'] = 'test-region';
    process.env['AWS_ACCESS_KEY_ID'] = 'test-access-key';
    process.env['AWS_SECRET_ACCESS_KEY'] = 'test-secret-key';
    process.env['COGNITO_CLIENT_ID'] = 'test-client-id';

    // Act
    const config = awsConfig();

    // Assert
    expect(config.region).toEqual('test-region');
    expect(config.accessKeyId).toEqual('test-access-key');
    expect(config.secretAccessKey).toEqual('test-secret-key');
    expect(config.cognitoClientId).toEqual('test-client-id');
  });
});
