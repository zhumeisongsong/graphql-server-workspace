import { AuthService } from '@auth/application';
import { Module } from '@nestjs/common';

import { AuthResolver } from './resolver/auth.resolver';

@Module({
  providers: [AuthResolver, AuthService],
  exports: [],
})
export class AuthModule {}
