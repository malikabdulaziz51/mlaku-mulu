import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Tourist } from 'src/domain/entities/tourist.entity';
import {
  ITouristRepository,
  TOURIST_REPOSITORY,
} from 'src/domain/repositories/tourist.repository.interface';

@Injectable()
export class FindByPassportNumberUseCase {
  constructor(
    @Inject(TOURIST_REPOSITORY)
    private readonly touristRepository: ITouristRepository,
  ) {}

  async execute(passportNumber: string): Promise<Tourist> {
    const tourist =
      await this.touristRepository.findByPassportNumber(passportNumber);

    if (!tourist) {
      throw new NotFoundException('Tourist not found');
    }

    return tourist;
  }
}
