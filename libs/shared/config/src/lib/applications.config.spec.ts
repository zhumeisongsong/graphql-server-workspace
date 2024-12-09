import { gatewayConfig, tasksAppConfig, usersAppConfig } from './applications.config';

describe('Config Tests', () => {
  describe('gatewayConfig', () => {
    it('should return default gateway config when no environment variables are set', () => {
      const config = gatewayConfig();
      expect(config).toEqual({
        protocol: 'http',
        host: 'localhost',
        port: 3333,
      });
    });

    it('should return gateway config with environment variables', () => {
      process.env['PROTOCOL'] = 'https';
      process.env['GATEWAY_HOST'] = 'gateway.example.com';
      process.env['GATEWAY_PORT'] = '4444';

      const config = gatewayConfig();
      expect(config).toEqual({
        protocol: 'https',
        host: 'gateway.example.com',
        port: 4444,
      });

      delete process.env['PROTOCOL'];
      delete process.env['GATEWAY_HOST'];
      delete process.env['GATEWAY_PORT'];
    });
  });

  describe('usersAppConfig', () => {
    it('should return default user app config when no environment variables are set', () => {
      const config = usersAppConfig();
      expect(config).toEqual({
        protocol: 'http',
        host: 'localhost',
        port: 15001,
        name: 'users',
      });
    });

    it('should return user app config with environment variables', () => {
      process.env['PROTOCOL'] = 'https';
      process.env['USERS_HOST'] = 'users.example.com';
      process.env['USERS_PORT'] = '5555';

      const config = usersAppConfig();
      expect(config).toEqual({
        protocol: 'https',
        host: 'users.example.com',
        port: 5555,
        name: 'users',
      });

      delete process.env['PROTOCOL'];
      delete process.env['USERS_HOST'];
      delete process.env['USERS_PORT'];
    });
  });

  describe('tasksAppConfig', () => {
    it('should return default tasks app config when no environment variables are set', () => {
      const config = tasksAppConfig();
      expect(config).toEqual({
        protocol: 'http',
        host: 'localhost',
        port: 15002,
        name: 'tasks',
      });
    });

    it('should return tasks app config with environment variables', () => {
      process.env['PROTOCOL'] = 'https';
      process.env['TASKS_HOST'] = 'tasks.example.com';
      process.env['TASKS_PORT'] = '6666';

      const config = tasksAppConfig();
      expect(config).toEqual({
        protocol: 'https',
        host: 'tasks.example.com',
        port: 6666,
        name: 'tasks',
      });
    });
  });
});
