import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTripDto } from 'src/application/dtos/trip/update-trip.dto';
import { Trip } from 'src/domain/entities/trip.entity';
import {
  TOURIST_REPOSITORY,
  ITouristRepository,
} from 'src/domain/repositories/tourist.repository.interface';
import {
  ITripRepository,
  TRIP_REPOSITORY,
} from 'src/domain/repositories/trip.repository.interface';

@Injectable()
export class UpdateTripUseCase {
  constructor(
    @Inject(TRIP_REPOSITORY)
    private readonly tripRepository: ITripRepository,

    @Inject(TOURIST_REPOSITORY)
    private readonly touristRepository: ITouristRepository,
  ) {}

  async execute(id: number, updateTripDto: UpdateTripDto): Promise<Trip> {
    const trip = await this.tripRepository.findById(id);
    let tourist = null;
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    tourist = await this.touristRepository.findById(
      updateTripDto.touristId
        ? updateTripDto.touristId
        : trip.getTourist().getId(),
    );
    if (!tourist) {
      throw new NotFoundException(
        `Tourist with ID ${updateTripDto.touristId} not found`,
      );
    }

    const updatedTrip = Trip.create({
      id: trip.getId(),
      tourist: tourist,
      destination: updateTripDto.destination || trip.getDestination(),
      description: updateTripDto.description || trip.getDescription(),
      startDate: updateTripDto.startDate || trip.getStartDate(),
      endDate: updateTripDto.endDate || trip.getEndDate(),
      createdAt: trip.getCreatedAt(),
      updatedAt: new Date(),
      isCompleted:
        updateTripDto.isCompleted !== undefined
          ? updateTripDto.isCompleted
          : trip.getIsCompleted(),
    });
    return await this.tripRepository.save(updatedTrip);
  }
}
