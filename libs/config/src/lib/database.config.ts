import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  host: process.env['DATABASE_HOST'],
  port: process.env['DATABASE_PORT'] || 5432,
}));
