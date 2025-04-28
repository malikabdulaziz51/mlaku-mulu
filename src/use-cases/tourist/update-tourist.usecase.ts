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

  async execute(
    id: number,
    updateTouristDto: UpdateTouristDto,
  ): Promise<Tourist> {
    const tourist = await this.touristRepository.findById(id);

    if (!tourist) {
      throw new Error('Tourist not found');
    }

    const existingTourist = await this.touristRepository.findByPassportNumber(
      updateTouristDto.passportNumber !== undefined
        ? updateTouristDto.passportNumber
        : tourist.getPassportNumber(),
    );

    if (existingTourist && existingTourist.getId() !== id) {
      throw new BadRequestException(
        'Tourist with this passport number already exists',
      );
    }

    const updatedTourist = Tourist.create({
      id: tourist.getId(),
      name: updateTouristDto.name || tourist.getName(),
      passportNumber:
        updateTouristDto.passportNumber || tourist.getPassportNumber(),
      phone: updateTouristDto.phone || tourist.getPhone(),
      nationality: updateTouristDto.nationality || tourist.getNationality(),
    });

    return await this.touristRepository.save(updatedTourist);
  }
}
