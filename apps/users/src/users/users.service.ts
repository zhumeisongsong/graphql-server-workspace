import { Injectable } from '@nestjs/common';
import { User } from '@user/domain';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Richard Roe' },
  ];

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
