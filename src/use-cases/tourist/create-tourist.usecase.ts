import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateTouristDto } from 'src/application/dtos/tourist/create-tourist.dto';
import { Tourist } from 'src/domain/entities/tourist.entity';
import {
  ITouristRepository,
  TOURIST_REPOSITORY,
} from 'src/domain/repositories/tourist.repository.interface';

@Injectable()
export class CreateTouristUseCase {
  constructor(
    @Inject(TOURIST_REPOSITORY)
    private readonly touristRepository: ITouristRepository,
  ) {}

  async execute(createTouristDto: CreateTouristDto): Promise<void> {
    const existing = await this.touristRepository.findByPassportNumber(
      createTouristDto.passportNumber,
    );

    if (existing) {
      throw new BadRequestException('Tourist data already exists');
    }

    const tourist = Tourist.create({
      name: createTouristDto.name,
      passportNumber: createTouristDto.passportNumber,
      nationality: createTouristDto.nationality,
      phone: createTouristDto.phone,
    });

    await this.touristRepository.save(tourist);
  }
}
