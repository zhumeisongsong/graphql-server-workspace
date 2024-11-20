import { Inject, Injectable } from '@nestjs/common';
import { User, USERS_REPOSITORY, UsersRepository } from '@users/domain';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return null;
    }
    return user;
  }
}
