import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const awsSchema = z.object({
  region: z.string().min(1),
  accessKeyId: z.string().min(1),
  secretAccessKey: z.string().min(1),
  cognitoClientId: z.string().min(1),
});

export type AwsConfig = z.infer<typeof awsSchema>;

export const awsConfig = registerAs('aws', (): AwsConfig => {
  const config = {
    region: process.env['AWS_REGION'],
    accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
    secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
    cognitoClientId: process.env['COGNITO_CLIENT_ID'],
  };

  return awsSchema.parse(config);
});
