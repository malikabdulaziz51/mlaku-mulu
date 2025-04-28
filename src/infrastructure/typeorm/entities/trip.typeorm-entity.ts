import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TouristTypeormEntity } from './tourist.typeorm-entity';

@Entity('trips')
export class TripTypeormEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamp', name: 'end_date' })
  endDate: Date;

  @Column()
  destination: string;

  @Column()
  description: string;

  @Column({ default: false, name: 'is_completed' })
  isCompleted: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @Column({ default: false, name: 'is_deleted' })
  isDeleted: boolean;

  @ManyToOne(() => TouristTypeormEntity, (tourist) => tourist.trips, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tourist_id', referencedColumnName: 'id' })
  tourist: TouristTypeormEntity;

  @Column({ nullable: true, name: 'tourist_id' })
  touristId: number;
}
