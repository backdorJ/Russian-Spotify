import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {DataSource, DataSourceOptions} from "typeorm";
import * as process from "node:process";
import { config } from 'dotenv';

config();

export const ormconfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.STATISTIC_DB_HOST,
    port: +process.env.STATISTIC_DB_PORT,
    username: process.env.STATISTIC_DB_USERNAME,
    password: process.env.STATISTIC_DB_PASSWORD,
    database: process.env.STATISTIC_DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
    entities: ['dist/DAL/entities/russianSpotifyStatisticDbEntities/*.entity{.ts, .js}'],
    migrations: ["./src/modules/statistic/migrations/*.ts"],
    migrationsTableName: "typeorm_migrations"
};

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.STATISTIC_DB_HOST,
    port: +process.env.STATISTIC_DB_PORT,
    username: process.env.STATISTIC_DB_USERNAME,
    password: process.env.STATISTIC_DB_PASSWORD,
    database: process.env.STATISTIC_DB_NAME,
    synchronize: true,
    entities: ['./dist/DAL/entities/russianSpotifyStatisticDbEntities/*.entity{.ts, .js}'],
    migrations: ["./src/DAL/migrations/*{.ts, .js}"],
    migrationsTableName: "typeorm_migrations"
}

console.log(process.env.STATISTIC_DB_PASSWORD);

export const connectionSource = new DataSource(dataSourceOptions);
