import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '@users/application';

import { UserDto } from '../dto/user.dto';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UserDto, { nullable: true })
  getUser(@Args({ name: 'id', type: () => ID }) id: string): Promise<UserDto | null> {
    return this.usersService.findById(id);
  }
}
