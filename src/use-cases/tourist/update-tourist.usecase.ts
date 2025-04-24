import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateTouristDto } from 'src/application/dtos/tourist/update-tourist.dto';
import { Tourist } from 'src/domain/entities/tourist.entity';
import {
  ITouristRepository,
  TOURIST_REPOSITORY,
} from 'src/domain/repositories/tourist.repository.interface';

@Injectable()
export class UpdateTouristUseCase {
  constructor(
    @Inject(TOURIST_REPOSITORY)
    private readonly touristRepository: ITouristRepository,
  ) {}

  async execute(id: number, updateTouristDto: UpdateTouristDto): Promise<void> {
    const tourist = await this.touristRepository.findById(id);

    if (!tourist) {
      throw new Error('Tourist not found');
    }

    if (
      updateTouristDto.passportNumber &&
      updateTouristDto.passportNumber !== tourist.getPassportNumber()
    ) {
      const existingTourist = await this.touristRepository.findByPassportNumber(
        updateTouristDto.passportNumber,
      );

      if (existingTourist && existingTourist.getId() !== id) {
        throw new BadRequestException(
          'Tourist with this passport number already exists',
        );
      }
    }

    await this.touristRepository.save({
      ...tourist,
      ...updateTouristDto,
    } as Tourist);
  }
}
