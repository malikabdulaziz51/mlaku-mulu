import { Inject, Injectable } from '@nestjs/common';
import {
  ITripRepository,
  TRIP_REPOSITORY,
} from 'src/domain/repositories/trip.repository.interface';

@Injectable()
export class DeleteTripUseCase {
  constructor(
    @Inject(TRIP_REPOSITORY)
    private readonly tripRepository: ITripRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return await this.tripRepository.delete(id);
  }
}
