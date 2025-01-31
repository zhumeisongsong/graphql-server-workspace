import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const deepSeekSchema = z.object({
  apiUrl: z.string().min(1),
  apiKey: z.string().min(1),
});

export type DeepSeekConfig = z.infer<typeof deepSeekSchema>;

export const deepSeekConfig = registerAs('deepSeek', (): DeepSeekConfig => {
  const config = {
    apiUrl: process.env['DEEP_SEEK_API_URL'] ?? '',
    apiKey: process.env['DEEP_SEEK_API_KEY'] ?? '',
  };

  return deepSeekSchema.parse(config);
});
