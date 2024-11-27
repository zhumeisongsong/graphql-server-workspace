import { Module } from '@nestjs/common';
import { AwsCognitoService } from './aws-cognito.service';

@Module({
  controllers: [],
  providers: [AwsCognitoService],
  exports: [AwsCognitoService],
})
export class AwsCognitoModule {}
