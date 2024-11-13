import { registerAs } from '@nestjs/config';

const DEFAULT_HOST = 'http://localhost';

const DEFAULT_PORT = {
  user: '15001',
  task: '15002',
  gateway: '3333',
};

export const gatewayConfig = registerAs('gateway', () => ({
  host: process.env['GATEWAY_HOST'] ?? DEFAULT_HOST,
  port: process.env['GATEWAY_PORT'] ?? DEFAULT_PORT.gateway,
}));

export const userAppConfig = registerAs('userApp', () => ({
  host: process.env['USER_HOST'] ?? DEFAULT_HOST,
  port: process.env['USER_PORT'] ?? DEFAULT_PORT.user,
  name: 'user',
}));
