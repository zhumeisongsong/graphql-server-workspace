import {
  gatewayConfig,
  userSubGraph,
  taskSubGraph,
} from './applications-config';

describe('applicationsConfig', () => {
  describe('environment variables', () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it('should use environment variables when provided', () => {
      process.env['GATEWAY_HOST'] = 'custom-host';
      process.env['GATEWAY_PORT'] = '4000';
      expect(gatewayConfig.host).toBe('custom-host');
      expect(gatewayConfig.port).toBe(4000);
    });

    it('should use default values when environment variables are not set', () => {
      delete process.env['GATEWAY_HOST'];
      delete process.env['GATEWAY_PORT'];
      expect(gatewayConfig.host).toBeDefined();
      expect(gatewayConfig.port).toBeDefined();
    });
  });

  describe('configuration objects', () => {
    it('should have required properties for gateway config', () => {
      expect(gatewayConfig).toHaveProperty('host');
      expect(gatewayConfig).toHaveProperty('port');
    });

    it('should have required properties for user subgraph', () => {
      expect(userSubGraph).toHaveProperty('host');
      expect(userSubGraph).toHaveProperty('port');
    });

    it('should have required properties for task subgraph', () => {
      expect(taskSubGraph).toHaveProperty('host');
      expect(taskSubGraph).toHaveProperty('port');
    });
  });
});
