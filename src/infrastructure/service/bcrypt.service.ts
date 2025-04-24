import { Injectable } from '@nestjs/common';
import { IHashService } from 'src/domain/interfaces/hash.service.interface';
import bcrypt from 'bcrypt';

@Injectable()
export class BcruptSevice implements IHashService {
  private readonly saltRounds = 10;

  async hash(plainText: string): Promise<string> {
    return await bcrypt.hash(plainText, this.saltRounds);
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hashedText);
  }
}

export const HASH_SERVICE = 'HASH_SERVICE';
