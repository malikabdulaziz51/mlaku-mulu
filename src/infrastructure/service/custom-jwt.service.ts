import type {
  IJwtService,
  JwtPayload,
} from 'src/domain/interfaces/jwt.service.interface';
import type { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomJwtService implements IJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sign(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET,
    });
  }

  async verify(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}

export const CUSTOM_JWT_SERVICE = 'CUSTOM_JWT_SERVICE';
