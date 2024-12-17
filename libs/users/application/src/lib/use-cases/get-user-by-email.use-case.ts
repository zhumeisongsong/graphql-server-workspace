import { Injectable } from "@nestjs/common";
import { User } from "@users/domain";
import { UsersService } from "../users.service";

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async execute(email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }
}
