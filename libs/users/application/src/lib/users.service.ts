import { Injectable } from '@nestjs/common';
import { User } from '@users/domain';

import { GetUserUseCase } from './use-cases/get-user.use-case';

@Injectable()
export class UsersService {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  async findById(id: string): Promise<User | null> {
    return this.getUserUseCase.execute(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.getUserUseCase.execute(email);
  }
}
