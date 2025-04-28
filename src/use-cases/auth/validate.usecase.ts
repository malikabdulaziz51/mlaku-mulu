import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/application/dtos/auth/login.dto';
import { User } from 'src/domain/entities/user.entity';
import { IHashService } from 'src/domain/interfaces/hash.service.interface';
import {
  USER_REPOSITORY,
  IUserRepository,
} from 'src/domain/repositories/user.repository.interface';
import { HASH_SERVICE } from 'src/infrastructure/service/bcrypt.service';

@Injectable()
export class ValidateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
  ) {}
  async execute(loginDto: LoginDto): Promise<User> {
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatch = await this.hashService.compare(
      loginDto.password,
      user.getPassword(),
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
