import { TypeOrmModule } from '@nestjs/typeorm';
import { TOURIST_REPOSITORY } from 'src/domain/repositories/tourist.repository.interface';
import { CreateTouristUseCase } from 'src/use-cases/tourist/create-tourist.usecase';
import { DeleteTouristUseCase } from 'src/use-cases/tourist/delete.usecase';
import { UpdateTouristUseCase } from 'src/use-cases/tourist/update-tourist.usecase';
import { TouristsController } from './tourists.controller';
import { FindAllUseCase } from 'src/use-cases/tourist/find-all.usecase';
import { FindByIdUseCase } from 'src/use-cases/tourist/find-by-id.usecase';
import { Module } from '@nestjs/common';
import { TouristTypeormRepository } from 'src/infrastructure/typeorm/repositories/tourist.typeorm-repository';
import { TouristTypeormEntity } from 'src/infrastructure/typeorm/entities/tourist.typeorm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TouristTypeormEntity])],
  controllers: [TouristsController],
  providers: [
    CreateTouristUseCase,
    FindAllUseCase,
    FindByIdUseCase,
    UpdateTouristUseCase,
    DeleteTouristUseCase,
    {
      provide: TOURIST_REPOSITORY,
      useClass: TouristTypeormRepository,
    },
  ],
  exports: [TOURIST_REPOSITORY],
})
export class TouristsModule {}
