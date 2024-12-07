import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from '@shared/infrastructure-mongoose';
import { UsersService, GetUserByIdUseCase, GetUserByEmailUseCase } from '@users/application';
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
    JwtService,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
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
