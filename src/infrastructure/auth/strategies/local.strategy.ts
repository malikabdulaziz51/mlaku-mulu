// src/infrastructure/auth/strategies/local.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject } from '@nestjs/common';
import { ValidateUserUseCase } from 'src/use-cases/auth/validate.usecase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ValidateUserUseCase)
    private readonly validateUserUseCase: ValidateUserUseCase,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const result = await this.validateUserUseCase.execute({
        email,
        password,
      });
      return result;
    } catch (error) {
      console.error('Login failed:', error.message);
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
