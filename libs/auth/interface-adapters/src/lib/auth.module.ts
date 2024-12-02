import { Module } from '@nestjs/common';

import { AuthResolver } from './resolver/auth.resolver';

@Module({
  providers: [AuthResolver],
  exports: [],
})
export class AuthModule {}
