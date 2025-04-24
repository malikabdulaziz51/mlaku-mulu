import { Inject, Injectable } from '@nestjs/common';
import {
  ITouristRepository,
  TOURIST_REPOSITORY,
} from 'src/domain/repositories/tourist.repository.interface';

@Injectable()
export class DeleteTouristUseCase {
  constructor(
    @Inject(TOURIST_REPOSITORY)
    private readonly touristRepository: ITouristRepository,
  ) {}

  async execute(id: number): Promise<void> {
    return await this.touristRepository.delete(id);
  }
}
