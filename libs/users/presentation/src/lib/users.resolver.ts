import { Args, ID, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { UsersService } from '@users/application';
import { User } from '@user/domain';

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
