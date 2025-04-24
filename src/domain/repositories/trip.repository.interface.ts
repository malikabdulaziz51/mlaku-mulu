import { Trip } from '../entities/trip.entity';

export interface ITripRepository {
  findAll(): Promise<Trip[]>;
  findById(id: number): Promise<Trip | null>;
  findByTouristId(touristId: number): Promise<Trip[] | null>;
  save(trip: Trip): Promise<Trip>;
  delete(id: number): Promise<void>;
}

export const TRIP_REPOSITORY = 'TRIP_REPOSITORY';
