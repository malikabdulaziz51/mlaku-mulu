import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './application/controllers/auth/auth.module';
import { TouristsModule } from './application/controllers/tourists/tourists.module';
import { TripsModule } from './application/controllers/trips/trips.module';
import { UsersModule } from './application/controllers/users/users.module';
import { DatabaseConfig } from './infrastructure/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    AuthModule,
    UsersModule,
    TouristsModule,
    TripsModule,
  ],
})
export class AppModule {}
