import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_REPOSITORY } from 'src/domain/repositories/user.repository.interface';
import { JwtStrategy } from 'src/infrastructure/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/infrastructure/auth/strategies/local.strategy';
import {
  BcruptSevice,
  HASH_SERVICE,
} from 'src/infrastructure/service/bcrypt.service';
import { LoginUseCase } from 'src/use-cases/auth/login.usecase';
import { AuthController } from './auth.controller';
import { UserTypeormRepository } from 'src/infrastructure/typeorm/repositories/user.typeorm-repository';
import { UserTypeormEntity } from 'src/infrastructure/typeorm/entities/user.typeorm-entity';
import * as dotenv from 'dotenv';
import { ValidateUserUseCase } from 'src/use-cases/auth/validate.usecase';
dotenv.config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '10m',
      },
    }),
    TypeOrmModule.forFeature([UserTypeormEntity]),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    LoginUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeormRepository,
    },
    {
      provide: HASH_SERVICE,
      useClass: BcruptSevice,
    },
    ValidateUserUseCase,
  ],
  exports: [LoginUseCase, JwtModule, ValidateUserUseCase],
})
export class AuthModule {}
