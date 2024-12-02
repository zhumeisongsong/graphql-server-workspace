import { Module } from '@nestjs/common';
import { AuthInterfaceAdaptersService } from './auth-interface-adapters.service';

@Module({
  controllers: [],
  providers: [AuthInterfaceAdaptersService],
  exports: [AuthInterfaceAdaptersService],
})
export class AuthInterfaceAdaptersModule {}
