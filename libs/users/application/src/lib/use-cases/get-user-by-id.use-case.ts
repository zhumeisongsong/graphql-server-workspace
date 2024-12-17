import { Injectable } from '@nestjs/common';
import { User } from '@users/domain';

import { UsersService } from '../users.service';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly usersService: UsersService) {}

  async execute(id: string): Promise<User> {
    return  await this.usersService.findOneById(id);
  }
}
