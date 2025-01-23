import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User, USERS_REPOSITORY, UsersRepository } from '@users/domain';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneById(id);
    if (!user) {
      // throw new NotFoundException(userError.NOT_FOUND);
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneByEmail(email);
    if (!user) {
      // throw new NotFoundException(userError.NOT_FOUND);
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
