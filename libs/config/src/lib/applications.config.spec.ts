import { gatewayConfig, userAppConfig } from './applications.config';

describe('Config Tests', () => {
  describe('gatewayConfig', () => {
    it('should return default values when environment variables are not set', () => {
      const config = gatewayConfig();
      expect(config.host).toBe('http://localhost');
      expect(config.port).toBe('3333');
    });

    it('should return environment values when environment variables are set', () => {
      process.env['GATEWAY_HOST'] = 'http://gateway-host';
      process.env['GATEWAY_PORT'] = '4000';
      const config = gatewayConfig();
      expect(config.host).toBe('http://gateway-host');
      expect(config.port).toBe('4000');
      delete process.env['GATEWAY_HOST'];
      delete process.env['GATEWAY_PORT'];
    });
  });

  describe('userAppConfig', () => {
    it('should return default values when environment variables are not set', () => {
      const config = userAppConfig();
      expect(config.host).toBe('http://localhost');
      expect(config.port).toBe('15001');
      expect(config.name).toBe('user');
    });

    it('should return environment values when environment variables are set', () => {
      process.env['USER_HOST'] = 'http://user-host';
      process.env['USER_PORT'] = '5000';
      const config = userAppConfig();
      expect(config.host).toBe('http://user-host');
      expect(config.port).toBe('5000');
      expect(config.name).toBe('user');
      delete process.env['USER_HOST'];
      delete process.env['USER_PORT'];
    });
  });
});