import { Injectable } from '@nestjs/common';
import { User } from '@user/domain';
import { GetUserUsecase } from '@user/usecase';

@Injectable()
export class UserService {
  constructor(private readonly getUserUsecase: GetUserUsecase) {}

  async findById(id: string): Promise<User | null> {
    return this.getUserUsecase.execute(id);
  }
}
