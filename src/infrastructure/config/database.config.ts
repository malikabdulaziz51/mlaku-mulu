import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const sharedConfig = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: [__dirname + '/../../*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../migrations/*.ts'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => sharedConfig);

export const connectionSource = new DataSource(
  sharedConfig as DataSourceOptions,
);
