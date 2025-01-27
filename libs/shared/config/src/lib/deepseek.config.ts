import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const deepseekSchema = z.object({
  apiUrl: z.string().min(1),
  apiKey: z.string().min(1),
});

export type DeepSeekConfig = z.infer<typeof deepseekSchema>;

export const deepseekConfig = registerAs('deepseek', (): DeepSeekConfig => {
  const config = {
    apiUrl: process.env['DEEPSEEK_API_URL'] ?? '',
    apiKey: process.env['DEEPSEEK_API_KEY'] ?? '',
  };

  return deepseekSchema.parse(config);
});
