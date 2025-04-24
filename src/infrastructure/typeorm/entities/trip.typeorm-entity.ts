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

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column()
  destination: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => TouristTypeormEntity, (tourist) => tourist.trips, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'touristId', referencedColumnName: 'id' })
  tourist: TouristTypeormEntity;

  @Column({ nullable: true })
  touristId: number;
}
