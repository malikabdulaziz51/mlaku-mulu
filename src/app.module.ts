import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './application/controllers/auth/auth.module';
import { TouristsModule } from './application/controllers/tourists/tourists.module';
import { TripsModule } from './application/controllers/trips/trips.module';
import { UsersModule } from './application/controllers/users/users.module';
import databaseConfig from './infrastructure/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        ...(await configService.get('typeorm')), // Fetch the shared config
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    TouristsModule,
    TripsModule,
  ],
})
export class AppModule {}
