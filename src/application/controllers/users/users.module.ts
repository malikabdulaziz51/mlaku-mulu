import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from 'src/use-cases/user/create-user.usecase';
import { DeleteUserUseCase } from 'src/use-cases/user/delete.usecase';
import { UpdateUserUseCase } from 'src/use-cases/user/update-user.usecase';
import { findAllUsersUseCase } from 'src/use-cases/user/find-all.usecase';
import { FindUserByIdUseCase } from 'src/use-cases/user/find-user-by-id.usecase';
import { USER_REPOSITORY } from 'src/domain/repositories/user.repository.interface';
import { UserTypeormRepository } from 'src/infrastructure/typeorm/repositories/user.typeorm-repository';
import {
  BcruptSevice,
  HASH_SERVICE,
} from 'src/infrastructure/service/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    findAllUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    FindUserByIdUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeormRepository,
    },
    {
      provide: HASH_SERVICE,
      useClass: BcruptSevice,
    },
  ],
})
export class UsersModule {}
