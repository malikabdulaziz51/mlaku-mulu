import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/application/dtos/user/update-user.dto';
import { User } from 'src/domain/entities/user.entity';
import { IHashService } from 'src/domain/interfaces/hash.service.interface';
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

    return this.userRepository.save({ ...user, ...updateUserDto } as User);
  }
}
