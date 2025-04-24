import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';
import { User } from 'src/domain/entities/user.entity';
import { IHashService } from 'src/domain/interfaces/hash.service.interface';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/domain/repositories/user.repository.interface';
import { HASH_SERVICE } from 'src/infrastructure/service/bcrypt.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findByEmail(createUserDto.email);

    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashService.hash(createUserDto.password);

    const newUser = User.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });

    return await this.userRepository.save(newUser);
  }
}
