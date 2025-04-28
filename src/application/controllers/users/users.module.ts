import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { UserTypeormEntity } from 'src/infrastructure/typeorm/entities/user.typeorm-entity';
import { TOURIST_REPOSITORY } from 'src/domain/repositories/tourist.repository.interface';
import { TouristTypeormRepository } from 'src/infrastructure/typeorm/repositories/tourist.typeorm-repository';
import { TouristTypeormEntity } from 'src/infrastructure/typeorm/entities/tourist.typeorm-entity';
import { TouristsModule } from '../tourists/tourists.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTypeormEntity, TouristTypeormEntity]),
    TouristsModule,
  ],
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
    {
      provide: TOURIST_REPOSITORY,
      useClass: TouristTypeormRepository,
    },
  ],
})
export class UsersModule {}
