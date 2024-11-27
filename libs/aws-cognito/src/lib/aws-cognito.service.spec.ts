import { Test } from '@nestjs/testing';
import { AwsCognitoService } from './aws-cognito.service';

describe('AwsCognitoService', () => {
  let service: AwsCognitoService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AwsCognitoService],
    }).compile();

    service = module.get(AwsCognitoService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
