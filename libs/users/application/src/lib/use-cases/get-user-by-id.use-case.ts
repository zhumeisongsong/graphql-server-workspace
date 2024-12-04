import { Inject, Injectable } from '@nestjs/common';
import { User, USERS_REPOSITORY, UsersRepository } from '@users/domain';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(id: string): Promise<User | null> {
    return await this.usersRepository.findById(id);
  }
}
