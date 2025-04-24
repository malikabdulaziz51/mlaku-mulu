import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from 'src/domain/entities/trip.entity';
import { ITripRepository } from 'src/domain/repositories/trip.repository.interface';
import { Repository } from 'typeorm';
import { TripTypeormEntity } from '../entities/trip.typeorm-entity';
import { Tourist } from 'src/domain/entities/tourist.entity';

export class TripTypeormRepository implements ITripRepository {
  constructor(
    @InjectRepository(TripTypeormRepository)
    private readonly tripRepository: Repository<TripTypeormEntity>,
  ) {}
  async findAll(): Promise<Trip[]> {
    const tripEntities = await this.tripRepository.find();
    return tripEntities.map((tripEntity) => this.toDomainEntity(tripEntity));
  }
  async findById(id: number): Promise<Trip | null> {
    const trip = await this.tripRepository
      .createQueryBuilder('trip')
      .leftJoinAndSelect('trip.tourist', 'tourist')
      .where('trip.id = :id', { id })
      .andWhere('trip.isDeleted = false')
      .getOne();

    if (!trip) {
      return null;
    }
    return this.toDomainEntity(trip);
  }
  async findByTouristId(touristId: number): Promise<Trip[] | null> {
    const trips = await this.tripRepository
      .createQueryBuilder('trip')
      .leftJoinAndSelect('trip.tourist', 'tourist')
      .where('trip.touristId = :touristId', { touristId })
      .andWhere('trip.isDeleted = false')
      .getMany();

    if (!trips) {
      return null;
    }
    return trips.map((trip) => this.toDomainEntity(trip));
  }

  async save(trip: Trip): Promise<Trip> {
    const tripEntity = this.toTypeormEntity(trip);
    const savedTrip = await this.tripRepository.save(tripEntity);
    return this.toDomainEntity(savedTrip);
  }
  async delete(id: number): Promise<void> {
    const trip = await this.tripRepository
      .createQueryBuilder('trip')
      .where('trip.id = :id', { id })
      .getOne();
    if (!trip) {
      throw new Error('Trip not found');
    }
    await this.tripRepository.remove(trip);
  }

  private toDomainEntity(tripTypeormEntity: TripTypeormEntity): Trip {
    return Trip.create({
      destination: tripTypeormEntity.destination,
      startDate: tripTypeormEntity.startDate,
      endDate: tripTypeormEntity.endDate,
      description: tripTypeormEntity.description,
      isCompleted: tripTypeormEntity.isCompleted,
      tourist: Tourist.create({
        name: tripTypeormEntity.tourist.name,
        phone: tripTypeormEntity.tourist.phone,
        nationality: tripTypeormEntity.tourist.nationality,
        passportNumber: tripTypeormEntity.tourist.passportNumber,
      }),
      createdAt: tripTypeormEntity.createdAt,
      updatedAt: tripTypeormEntity.updatedAt,
    });
  }

  private toTypeormEntity(trip: Trip): TripTypeormEntity {
    const entity = new TripTypeormEntity();
    entity.id = trip.getId();
    entity.destination = trip.getDestination();
    entity.startDate = trip.getStartDate();
    entity.endDate = trip.getEndDate();
    entity.description = trip.getDescription();
    entity.isCompleted = trip.getIsCompleted();
    entity.tourist = {
      id: trip.getTourist().getId(),
      name: trip.getTourist().getName(),
      phone: trip.getTourist().getPhone(),
      nationality: trip.getTourist().getNationality(),
      passportNumber: trip.getTourist().getPassportNumber(),
    };
    entity.createdAt = trip.getCreatedAt();
    entity.updatedAt = trip.getUpdatedAt();
    return entity;
  }
}
