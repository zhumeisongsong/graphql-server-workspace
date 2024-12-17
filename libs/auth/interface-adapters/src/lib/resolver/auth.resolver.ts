import { SignInUseCase } from '@auth/application';
import { Resolver, Mutation, Args, Field, ObjectType } from '@nestjs/graphql';

import { SignInInputDto } from '../dto/sign-in-input.dto';

@ObjectType()
export class Response {
  @Field()
  accessToken!: string;
}

// Expose the authentication endpoints
@Resolver()
export class AuthResolver {
  constructor(private signInUseCase: SignInUseCase) {}

  @Mutation(() => Response)
  async signIn(
    @Args({ name: 'signInInput', type: () => SignInInputDto })
    signInInput: SignInInputDto,
  ): Promise<Response> {
    return this.signInUseCase.execute(signInInput.email, signInInput.password);
  }
}
