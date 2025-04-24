import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Trip } from 'src/domain/entities/trip.entity';
import {
  ITouristRepository,
  TOURIST_REPOSITORY,
} from 'src/domain/repositories/tourist.repository.interface';
import {
  ITripRepository,
  TRIP_REPOSITORY,
} from 'src/domain/repositories/trip.repository.interface';

@Injectable()
export class findByTouristIdUseCase {
  constructor(
    @Inject(TOURIST_REPOSITORY)
    private readonly touristRepository: ITouristRepository,
    @Inject(TRIP_REPOSITORY)
    private readonly tripRepository: ITripRepository,
  ) {}

  async execute(touristId: number): Promise<Trip[]> {
    const tourist = await this.touristRepository.findById(touristId);

    if (!tourist) {
      throw new NotFoundException('Tourist not found');
    }

    const trips = await this.tripRepository.findByTouristId(tourist.getId());

    if (!trips) {
      throw new NotFoundException('No trips found for the given tourist ID');
    }

    return trips;
  }
}
