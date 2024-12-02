import { AuthService } from '@auth/application';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { SignInInputDto } from '../dto/sign-in-input.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation()
  async signIn(
    @Args({ name: 'signInInput', type: () => SignInInputDto })
    signInInput: SignInInputDto,
  ): Promise<{
    accessToken: string;
  }> {
    return this.authService.signIn(signInInput.email, signInInput.password);
  }
}
