import { Args, ID, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { User } from '@user/domain';

import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private usersService: UserService) {}

  @Query(() => User)
  getUser(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<User | null> {
    return this.usersService.findById(id);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<User | null> {
    return this.usersService.findById(reference.id);
  }
}
