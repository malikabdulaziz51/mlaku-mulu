// src/use-cases/auth/login.usecase.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { LoginResponseDto } from 'src/application/dtos/auth/login-response.dto';
import type { LoginDto } from 'src/application/dtos/auth/login.dto';
import type { IHashService } from 'src/domain/interfaces/hash.service.interface';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from 'src/domain/repositories/user.repository.interface';
import { HASH_SERVICE } from 'src/infrastructure/service/bcrypt.service';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Debug password comparison
    const passwordMatch = await this.hashService.compare(
      loginDto.password,
      user.getPassword(),
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.getId(),
      email: user.getEmail(),
      role: user.getRole(),
      touristId: user.getTouristId(),
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });

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
