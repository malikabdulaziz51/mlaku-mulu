import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Tourist } from 'src/domain/entities/tourist.entity';
import {
  ITouristRepository,
  TOURIST_REPOSITORY,
} from 'src/domain/repositories/tourist.repository.interface';

@Injectable()
export class FindByIdUseCase {
  constructor(
    @Inject(TOURIST_REPOSITORY)
    private readonly touristRepository: ITouristRepository,
  ) {}

  async execute(id: number): Promise<Tourist> {
    const tourist = await this.touristRepository.findById(id);

    if (!tourist) {
      throw new NotFoundException('Tourist not found');
    }

    return tourist;
  }
}
