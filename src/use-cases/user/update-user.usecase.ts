import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/application/dtos/user/update-user.dto';
import { User } from 'src/domain/entities/user.entity';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { IHashService } from 'src/domain/interfaces/hash.service.interface';
import {
  TOURIST_REPOSITORY,
  ITouristRepository,
} from 'src/domain/repositories/tourist.repository.interface';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/domain/repositories/user.repository.interface';
import { HASH_SERVICE } from 'src/infrastructure/service/bcrypt.service';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(TOURIST_REPOSITORY)
    private readonly touristRepository: ITouristRepository,
    @Inject(HASH_SERVICE)
    private readonly hashService: IHashService,
  ) {}

  async execute(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashService.hash(
        updateUserDto.password,
      );
    }

    console.log(updateUserDto.password);
    console.log(user.getPassword());

    if (updateUserDto.touristId) {
      const tourist = await this.touristRepository.findById(
        updateUserDto.touristId,
      );

      if (!tourist) {
        throw new BadRequestException('Tourist not found');
      }
    }

    const updatedUser = User.create({
      id: user.getId(),
      name: updateUserDto.name || user.getName(),
      email: updateUserDto.email || user.getEmail(),
      password: updateUserDto.password || user.getPassword(),
      role: (updateUserDto.role as UserRole) || user.getRole(),
      touristId: updateUserDto.touristId || user.getTouristId(),
      updatedAt: new Date(),
      createdAt: user.getCreatedAt(),
      isDeleted: user.getIsDeleted(),
    });

    return this.userRepository.save(updatedUser);
  }
}
