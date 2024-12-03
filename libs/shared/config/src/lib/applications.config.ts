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
  user: 15001,
  task: 15002,
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

export const userAppConfig = registerAs(
  'userApp',
  (): ServiceConfig => ({
    protocol: process.env['PROTOCOL'] ?? DEFAULT_PROTOCOL,
    host: process.env['USER_HOST'] ?? DEFAULT_HOST,
    port: process.env['USER_PORT']
      ? Number(process.env['USER_PORT'])
      : DEFAULT_PORT.user,
    name: 'user',
  }),
);
