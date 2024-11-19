import { User } from './user.entity';

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
}
