import { TypeOrmModule } from '@nestjs/typeorm';
import { Tourist } from 'src/domain/entities/tourist.entity';
import { TOURIST_REPOSITORY } from 'src/domain/repositories/tourist.repository.interface';
import { CreateTouristUseCase } from 'src/use-cases/tourist/create-tourist.usecase';
import { DeleteTouristUseCase } from 'src/use-cases/tourist/delete.usecase';
import { UpdateTouristUseCase } from 'src/use-cases/tourist/update-tourist.usecase';
import { TouristsController } from './tourists.controller';
import { FindAllUseCase } from 'src/use-cases/tourist/find-all.usecase';
import { FindByIdUseCase } from 'src/use-cases/tourist/find-by-id.usecase';
import { Module } from '@nestjs/common';
import { TouristTypeormRepository } from 'src/infrastructure/typeorm/repositories/tourist.typeorm-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tourist])],
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
