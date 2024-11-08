describe('Service Configurations', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should use default values when environment variables are not set', () => {
    const {
      gatewayConfig,
      userSubGraph,
      taskSubGraph,
    } = require('./applications-config');

    expect(gatewayConfig).toEqual({
      host: 'localhost',
      name: 'gateway',
      port: '3333',
    });

    expect(userSubGraph).toEqual({
      host: 'localhost',
      name: 'user',
      port: '15001',
    });

    expect(taskSubGraph).toEqual({
      host: 'localhost',
      name: 'task',
      port: '15002',
    });
  });

  it('should use environment variables when they are set', () => {
    process.env['GATEWAY_HOST'] = 'gateway.example.com';
    process.env['GATEWAY_PORT'] = '4000';
    process.env['USER_HOST'] = 'user.example.com';
    process.env['USER_PORT'] = '5000';
    process.env['TASK_HOST'] = 'task.example.com';
    process.env['TASK_PORT'] = '6000';

    jest.resetModules();

    const {
      gatewayConfig,
      userSubGraph,
      taskSubGraph,
    } = require('./applications-config');

    expect(gatewayConfig).toEqual({
      host: 'gateway.example.com',
      name: 'gateway',
      port: '4000',
    });

    expect(userSubGraph).toEqual({
      host: 'user.example.com',
      name: 'user',
      port: '5000',
    });

    expect(taskSubGraph).toEqual({
      host: 'task.example.com',
      name: 'task',
      port: '6000',
    });
  });
});
