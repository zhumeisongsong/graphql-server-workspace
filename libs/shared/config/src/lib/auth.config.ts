import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const authSchema = z.object({
  secret: z.string().min(1)
});

export type AuthConfig = z.infer<typeof authSchema>;

export const authConfig = registerAs('auth', (): AuthConfig => {
  const config = {
    secret: process.env['JWT_SECRET'],
  };

  return authSchema.parse(config);
});
