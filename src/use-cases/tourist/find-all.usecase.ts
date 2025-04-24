import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Tourist } from 'src/domain/entities/tourist.entity';
import {
  ITouristRepository,
  TOURIST_REPOSITORY,
} from 'src/domain/repositories/tourist.repository.interface';

@Injectable()
export class FindAllUseCase {
  constructor(
    @Inject(TOURIST_REPOSITORY)
    private readonly touristRepository: ITouristRepository,
  ) {}

  async execute(): Promise<Tourist[]> {
    const tourists = await this.touristRepository.findAll();

    if (tourists.length === 0) {
      throw new NotFoundException('Tourist not found');
    }

    return tourists;
  }
}
