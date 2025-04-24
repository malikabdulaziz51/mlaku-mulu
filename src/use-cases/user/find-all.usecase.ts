import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/domain/repositories/user.repository.interface';

@Injectable()
export class findAllUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    if (users.length === 0) {
      throw new NotFoundException('User not found');
    }
    return users;
  }
}
