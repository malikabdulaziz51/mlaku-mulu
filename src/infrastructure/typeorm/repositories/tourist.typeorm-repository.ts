import { InjectRepository } from '@nestjs/typeorm';
import { Tourist } from 'src/domain/entities/tourist.entity';
import { ITouristRepository } from 'src/domain/repositories/tourist.repository.interface';
import { Repository } from 'typeorm';
import { TouristTypeormEntity } from '../entities/tourist.typeorm-entity';

export class TouristTypeormRepository implements ITouristRepository {
  constructor(
    @InjectRepository(Tourist)
    private readonly touristRepository: Repository<TouristTypeormEntity>,
  ) {}
  async findAll(): Promise<Tourist[]> {
    const touristEntities = await this.touristRepository.find();
    return touristEntities.map((touristEntity) =>
      this.toDomainEntity(touristEntity),
    );
  }
  async findById(id: number): Promise<Tourist | null> {
    const tourist = await this.touristRepository
      .createQueryBuilder('tourist')
      .where('tourist.id = :id', { id })
      .getOne();
    if (!tourist) {
      return null;
    }
    return this.toDomainEntity(tourist);
  }
  async findByPassportNumber(passportNumber: string): Promise<Tourist | null> {
    const tourist = await this.touristRepository
      .createQueryBuilder('tourist')
      .where('tourist.passportNumber = :passportNumber', { passportNumber })
      .getOne();
    if (!tourist) {
      return null;
    }
    return this.toDomainEntity(tourist);
  }
  async save(tourist: Tourist): Promise<void> {
    const touristEntity = this.toTypeormEntity(tourist);
    await this.touristRepository.save(touristEntity);
  }

  async delete(id: number): Promise<void> {
    const tourist = await this.touristRepository
      .createQueryBuilder('tourist')
      .where('tourist.id = :id', { id })
      .getOne();
    if (!tourist) {
      throw new Error('Tourist not found');
    }
    await this.touristRepository.remove(tourist);
  }

  private toDomainEntity(touristTypeormEntity: TouristTypeormEntity): Tourist {
    return Tourist.create({
      name: touristTypeormEntity.name,
      phone: touristTypeormEntity.phone,
      nationality: touristTypeormEntity.nationality,
      passportNumber: touristTypeormEntity.passportNumber,
      id: touristTypeormEntity.id,
    });
  }

  private toTypeormEntity(tourist: Tourist): TouristTypeormEntity {
    const entity = new TouristTypeormEntity();
    entity.id = tourist.getId();
    entity.name = tourist.getName();
    entity.phone = tourist.getPhone();
    entity.nationality = tourist.getNationality();
    entity.passportNumber = tourist.getPassportNumber();
    return entity;
  }
}
