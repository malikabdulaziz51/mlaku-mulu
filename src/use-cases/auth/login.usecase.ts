import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginResponseDto } from 'src/application/dtos/auth/login-response.dto';
import { LoginDto } from 'src/application/dtos/auth/login.dto';
import { IHashService } from 'src/domain/interfaces/hash.service.interface';
import { IJwtService } from 'src/domain/interfaces/jwt.service.interface';
import {
  IUserRepository,
  USER_REPOSITORY,
} from 'src/domain/repositories/user.repository.interface';
import { HASH_SERVICE } from 'src/infrastructure/service/bcrypt.service';
import { JWT_SERVICE } from 'src/infrastructure/service/jwt.service';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
  ) {}

  async execute(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (
      !(await this.hashService.compare(loginDto.password, user.getPassword()))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
      touristId: user.getTouristId(),
    };

    const accessToken = await this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        role: user.getRole(),
      },
    };
  }
}
