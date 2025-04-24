import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Trip } from 'src/domain/entities/trip.entity';
import {
  ITripRepository,
  TRIP_REPOSITORY,
} from 'src/domain/repositories/trip.repository.interface';

@Injectable()
export class FindByIdUseCase {
  constructor(
    @Inject(TRIP_REPOSITORY)
    private readonly tripRepository: ITripRepository,
  ) {}

  async execute(id: number): Promise<Trip> {
    const trip = await this.tripRepository.findById(id);

    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    return trip;
  }
}
