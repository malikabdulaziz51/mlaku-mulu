// src/infrastructure/typeorm/repositories/user.typeorm-repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import type { IUserRepository } from 'src/domain/repositories/user.repository.interface';
import { Repository } from 'typeorm';
import { UserTypeormEntity } from '../entities/user.typeorm-entity';
import type { UserRole } from 'src/domain/enums/user-role.enum';

@Injectable()
export class UserTypeormRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeormEntity)
    private readonly userRepository: Repository<UserTypeormEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.isDeleted = false')
      .getMany();
    return users.map((user) => this.toDomainEntity(user));
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    return this.toDomainEntity(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    return this.toDomainEntity(user);
  }

  async save(user: User): Promise<User> {
    const entity = this.toTypeormEntity(user);
    console.log(entity);
    const savedEntity = await this.userRepository.save(entity);
    return this.toDomainEntity(savedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  private toDomainEntity(entity: UserTypeormEntity): User {
    return User.create({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      role: entity.role,
      touristId: entity.touristId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      isDeleted: entity.isDeleted,
    });
  }

  private toTypeormEntity(user: User): UserTypeormEntity {
    const entity = new UserTypeormEntity();
    entity.id = user.getId();
    entity.name = user.getName();
    entity.email = user.getEmail();
    entity.password = user.getPassword();
    entity.role = user.getRole() as UserRole;
    entity.touristId = user.getTouristId();
    entity.createdAt = user.getCreatedAt();
    entity.updatedAt = user.getUpdatedAt();
    entity.isDeleted = user.getIsDeleted();
    return entity;
  }
}
