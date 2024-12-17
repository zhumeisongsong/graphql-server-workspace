import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { GetUserByIdUseCase } from '@users/application';
import { User } from '@users/domain';

import { UserDto } from '../dto/user.dto';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  @Query(() => UserDto, { nullable: true })
  async getUser(
    @Args({ name: 'id', type: () => ID }) id: string,
  ): Promise<UserDto> {
    const user: User = await this.getUserByIdUseCase.execute(id);

    return new UserDto(user.id, user.email, user.firstName, user.lastName);
  }
}
