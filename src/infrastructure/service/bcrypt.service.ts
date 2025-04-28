import { Injectable } from '@nestjs/common';
import { IHashService } from 'src/domain/interfaces/hash.service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcruptSevice implements IHashService {
  private readonly saltRounds = 10;

  async hash(plainText: string): Promise<string> {
    return await bcrypt.hash(plainText, this.saltRounds);
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    if (!plainText || !hashedText) {
      console.error('Missing arguments for password comparison:', {
        plainTextExists: !!plainText,
        hashedTextExists: !!hashedText,
      });
      throw new Error('data and hash arguments required');
    }
    return await bcrypt.compare(plainText, hashedText);
  }
}

export const HASH_SERVICE = 'HASH_SERVICE';
