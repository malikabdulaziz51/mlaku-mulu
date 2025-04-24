import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateTripDto } from 'src/application/dtos/trip/create-trip.dto';
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
export class CreateTripUseCase {
  constructor(
    @Inject(TRIP_REPOSITORY)
    private readonly tripRepository: ITripRepository,
    @Inject(TOURIST_REPOSITORY)
    private readonly touristRepository: ITouristRepository,
  ) {}

  async execute(createTriptDto: CreateTripDto): Promise<void> {
    const tourist = await this.touristRepository.findById(
      createTriptDto.touristId,
    );

    if (!tourist) {
      throw new BadRequestException('Tourist not found');
    }

    const trip = Trip.create({
      tourist: tourist,
      destination: createTriptDto.destination,
      description: createTriptDto.description,
      startDate: createTriptDto.startDate,
      endDate: createTriptDto.endDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      isCompleted: createTriptDto.isCompleted,
    });

    await this.tripRepository.save(trip);
  }
}
