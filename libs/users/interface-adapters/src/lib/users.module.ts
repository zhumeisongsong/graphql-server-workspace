import { Module } from '@nestjs/common';
import { DatabaseModule } from '@shared/infrastructure-mongoose';
import {
  UsersService,
  GetUserByIdUseCase,

} from '@users/application';
import {
  MongooseUsersRepository,
  UserDocument,
  UserSchema,
} from '@users/infrastructure-mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { USERS_REPOSITORY } from '@users/domain';

import { UsersResolver } from './resolver/users.resolver';

@Module({
  providers: [
    UsersResolver,
    UsersService,
    GetUserByIdUseCase,
    {
      provide: USERS_REPOSITORY,
      useClass: MongooseUsersRepository,
    },
  ],
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
