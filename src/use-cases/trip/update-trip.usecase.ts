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

  async execute(id: number, updateTripDto: UpdateTripDto): Promise<void> {
    const trip = await this.tripRepository.findById(id);

    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }

    // If updating tourist, verify tourist exists
    if (
      updateTripDto.touristId &&
      updateTripDto.touristId !== trip.getTourist().getId()
    ) {
      const tourist = await this.touristRepository.findById(
        updateTripDto.touristId,
      );

      if (!tourist) {
        throw new NotFoundException(
          `Tourist with ID ${updateTripDto.touristId} not found`,
        );
      }
    }

    await this.tripRepository.save({
      ...trip,
      ...updateTripDto,
    } as Trip);
  }
}
