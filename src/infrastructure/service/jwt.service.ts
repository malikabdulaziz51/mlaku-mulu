import {
  IJwtService,
  JwtPayload,
} from 'src/domain/interfaces/jwt.service.interface';
import type { JwtService as NestJwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly jwtService: NestJwtService) {}
  async sign(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });
  }

  async verify(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, {
      ignoreExpiration: false,
    });
  }
}

export const JWT_SERVICE = 'JWT_SERVICE';
