import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const databaseSchema = z.object({
  host: z.string().min(1),
  port: z.coerce.number().int().min(1).max(65535),
});

export type DatabaseConfig = z.infer<typeof databaseSchema>;

export const databaseConfig = registerAs('database', () => {
  const config = {
    host: process.env['DATABASE_HOST'],
    port: process.env['DATABASE_PORT'] || 5432,
  };

  return databaseSchema.parse(config);
});
