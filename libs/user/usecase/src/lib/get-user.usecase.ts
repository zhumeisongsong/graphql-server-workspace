import { User, UserRepository } from '@user/domain';

export class GetUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async executeAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
