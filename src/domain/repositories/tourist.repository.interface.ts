import { Tourist } from '../entities/tourist.entity';

export interface ITouristRepository {
  findAll(): Promise<Tourist[]>;
  findById(id: number): Promise<Tourist | null>;
  findByPassportNumber(passportNumber: string): Promise<Tourist | null>;
  save(tourist: Tourist): Promise<void>;
  delete(id: number): Promise<void>;
}

export const TOURIST_REPOSITORY = 'TOURIST_REPOSITORY';
