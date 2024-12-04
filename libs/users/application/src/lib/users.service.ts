import { Injectable } from '@nestjs/common';
import { User } from '@users/domain';

import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email.use-case';

@Injectable()
export class UsersService {
  constructor(
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.getUserByIdUseCase.execute(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.getUserByEmailUseCase.execute(email);
  }
}
