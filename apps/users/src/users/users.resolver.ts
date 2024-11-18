import { Args, ID, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { User } from '@user/domain';

import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User, { nullable: true })
  getUser(@Args({ name: 'id', type: () => ID }) id: string): User | undefined {
    return this.usersService.findById(id);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): User | undefined {
    return this.usersService.findById(reference.id);
  }
}
