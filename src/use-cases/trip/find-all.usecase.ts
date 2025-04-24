import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Trip } from 'src/domain/entities/trip.entity';
import {
  ITripRepository,
  TRIP_REPOSITORY,
} from 'src/domain/repositories/trip.repository.interface';

@Injectable()
export class FindAllUseCase {
  constructor(
    @Inject(TRIP_REPOSITORY)
    private readonly tripRepository: ITripRepository,
  ) {}

  async execute(): Promise<Trip[]> {
    const trips = await this.tripRepository.findAll();

    if (trips.length === 0) {
      throw new NotFoundException('Trips not found');
    }

    return trips;
  }
}
