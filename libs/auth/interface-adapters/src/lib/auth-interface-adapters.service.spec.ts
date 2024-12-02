import { Test } from '@nestjs/testing';
import { AuthInterfaceAdaptersService } from './auth-interface-adapters.service';

describe('AuthInterfaceAdaptersService', () => {
  let service: AuthInterfaceAdaptersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthInterfaceAdaptersService],
    }).compile();

    service = module.get(AuthInterfaceAdaptersService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
