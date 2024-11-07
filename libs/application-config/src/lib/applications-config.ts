interface ServiceConfig {
  host: string;
  port: string;
}

const DEFAULT_HOST = 'localhost';

const DEFAULT_PORT = {
  user: '15001',
  task: '15002',
  gateway: '3333',
};

// Gateway
export const gatewayConfig: ServiceConfig = {
  host: process.env['GATEWAY_HOST'] ?? DEFAULT_HOST,
  port: process.env['GATEWAY_PORT'] ?? DEFAULT_PORT.gateway,
};

// Graphql
export const userSubGraph: ServiceConfig = {
  host: process.env['USER_HOST'] ?? DEFAULT_HOST,
  port: process.env['USER_PORT'] ?? DEFAULT_PORT.user,
};

export const taskSubGraph: ServiceConfig = {
  host: process.env['TASK_HOST'] ?? DEFAULT_HOST,
  port: process.env['TASK_PORT'] ?? DEFAULT_PORT.task,
};
