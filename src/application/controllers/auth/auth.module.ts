import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user.entity';
import { USER_REPOSITORY } from 'src/domain/repositories/user.repository.interface';
import { JwtStrategy } from 'src/infrastructure/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/infrastructure/auth/strategies/local.strategy';
import {
  BcruptSevice,
  HASH_SERVICE,
} from 'src/infrastructure/service/bcrypt.service';
import { JWT_SERVICE } from 'src/infrastructure/service/jwt.service';
import { LoginUseCase } from 'src/use-cases/auth/login.usecase';
import { AuthController } from './auth.controller';
import { UserTypeormRepository } from 'src/infrastructure/typeorm/repositories/user.typeorm-repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET', 'super-secret'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    TypeOrmModule.forFeature([User]),
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
    {
      provide: JWT_SERVICE,
      useClass: JwtService,
    },
  ],
})
export class AuthModule {}
