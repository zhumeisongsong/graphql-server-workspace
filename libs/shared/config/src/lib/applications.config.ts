import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const serviceSchema = z.object({
  protocol: z.string().min(1),
  host: z.string().min(1),
  port: z.coerce.number().int().min(1).max(65535),
  name: z.string().optional(),
});

export type ServiceConfig = z.infer<typeof serviceSchema>;

const DEFAULT_PROTOCOL = 'http' as const;
const DEFAULT_HOST = 'localhost' as const;
const DEFAULT_PORT = {
  users: 15001,
  tasks: 15002,
  gateway: 3333,
} as const;

export const gatewayConfig = registerAs(
  'gateway',
  (): ServiceConfig => ({
    protocol: process.env['PROTOCOL'] ?? DEFAULT_PROTOCOL,
    host: process.env['GATEWAY_HOST'] ?? DEFAULT_HOST,
    port: process.env['GATEWAY_PORT']
      ? Number(process.env['GATEWAY_PORT'])
      : DEFAULT_PORT.gateway,
  }),
);

export const usersAppConfig = registerAs(
  'usersApp',
  (): ServiceConfig => ({
    protocol: process.env['PROTOCOL'] ?? DEFAULT_PROTOCOL,
    host: process.env['USERS_HOST'] ?? DEFAULT_HOST,
    port: process.env['USERS_PORT']
      ? Number(process.env['USERS_PORT'])
      : DEFAULT_PORT.users,
    name: 'users',
  }),
);

export const tasksAppConfig = registerAs(
  'tasksApp',
  (): ServiceConfig => ({
    protocol: process.env['PROTOCOL'] ?? DEFAULT_PROTOCOL,
    host: process.env['TASKS_HOST'] ?? DEFAULT_HOST,
    port: process.env['TASKS_PORT']
      ? Number(process.env['TASKS_PORT'])
      : DEFAULT_PORT.tasks,
    name: 'tasks',
  }),
);
