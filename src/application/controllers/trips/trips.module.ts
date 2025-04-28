import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TRIP_REPOSITORY } from 'src/domain/repositories/trip.repository.interface';
import { CreateTripUseCase } from 'src/use-cases/trip/create-trip.usecase';
import { DeleteTripUseCase } from 'src/use-cases/trip/delete.usecase';
import { UpdateTripUseCase } from 'src/use-cases/trip/update-trip.usecase';
import { TouristsModule } from '../tourists/tourists.module';
import { TripsController } from './trips.controller';
import { FindAllUseCase } from 'src/use-cases/trip/find-all.usecase';
import { FindByIdUseCase } from 'src/use-cases/trip/find-by-id.usecase';
import { findByTouristIdUseCase } from 'src/use-cases/trip/find-by-tourist-id.usecase';
import { TripTypeormRepository } from 'src/infrastructure/typeorm/repositories/trip.typeorm-repository';
import { TripTypeormEntity } from 'src/infrastructure/typeorm/entities/trip.typeorm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([TripTypeormEntity]), TouristsModule],
  controllers: [TripsController],
  providers: [
    CreateTripUseCase,
    FindAllUseCase,
    FindByIdUseCase,
    findByTouristIdUseCase,
    UpdateTripUseCase,
    DeleteTripUseCase,
    {
      provide: TRIP_REPOSITORY,
      useClass: TripTypeormRepository,
    },
  ],
})
export class TripsModule {}
