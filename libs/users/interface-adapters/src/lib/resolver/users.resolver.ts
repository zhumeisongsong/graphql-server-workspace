import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '@users/application';

import { UserDto } from '../dto/user.dto';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UserDto, { nullable: true })
  async getUser(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<UserDto | null> {
    const user = await this.usersService.findById(id);

    if (!user) {
      return null;
    }

    return new UserDto(user.id, user.firstName, user.lastName, user.email);
  }
}
