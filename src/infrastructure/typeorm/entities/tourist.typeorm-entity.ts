import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TripTypeormEntity } from './trip.typeorm-entity';

@Entity('tourists')
export class TouristTypeormEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ unique: true, name: 'passport_number' })
  passportNumber: string;

  @Column()
  nationality: string;

  @OneToMany(() => TripTypeormEntity, (trip) => trip.tourist, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  trips?: TripTypeormEntity[];
}
