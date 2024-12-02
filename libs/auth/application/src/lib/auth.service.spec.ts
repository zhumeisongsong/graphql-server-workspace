import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token', async () => {
      const result = await service.signIn('test@example.com', 'password123');
      
      expect(result).toHaveProperty('accessToken');
      expect(typeof result.accessToken).toBe('string');
    });
  });
});
