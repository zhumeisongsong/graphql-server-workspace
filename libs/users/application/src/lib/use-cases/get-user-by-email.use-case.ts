import { Inject, Injectable } from "@nestjs/common";
import { User, USERS_REPOSITORY, UsersRepository } from "@users/domain";

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }
}
