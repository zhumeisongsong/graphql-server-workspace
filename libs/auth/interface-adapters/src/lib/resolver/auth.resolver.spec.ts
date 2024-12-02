import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@auth/application';
import { AuthResolver } from './auth.resolver';
import { SignInInputDto } from '../dto/sign-in-input.dto';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('signIn', () => {
    it('should call authService.signIn with correct parameters', async () => {
      const signInInput: SignInInputDto = {
        email: 'test@example.com',
        password: 'password123',
      };
      const expectedResult = { accessToken: 'testToken' };
      
      jest.spyOn(authService, 'signIn').mockResolvedValue(expectedResult);

      const result = await resolver.signIn(signInInput);

      expect(authService.signIn).toHaveBeenCalledWith(
        signInInput.email,
        signInInput.password
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
