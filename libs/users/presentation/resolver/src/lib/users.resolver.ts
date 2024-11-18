import { Args, ID, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { UsersService } from '@users/application';
import { User } from '@user/domain';
import { UserDto } from '@users/presentation-dto';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UserDto, { nullable: true })
  getUser(@Args({ name: 'id', type: () => ID }) id: string): UserDto | null {
    const user: User | undefined = this.usersService.findById(id); // Domain entity
    return user ? new UserDto(user.id, user.name) : null; 
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): User | undefined {
    return this.usersService.findById(reference.id);
  }
}
