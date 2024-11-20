import { User } from './user.entity';

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
}

export const USERS_REPOSITORY = Symbol('USERS_REPOSITORY');