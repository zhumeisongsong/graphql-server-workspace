import { Injectable } from '@nestjs/common';
import { User, UserRepository } from '@user/domain';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
