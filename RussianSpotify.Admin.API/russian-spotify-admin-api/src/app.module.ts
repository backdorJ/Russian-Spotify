import { Module } from '@nestjs/common';
import {ThrottlerModule, ThrottlerGuard} from '@nestjs/throttler';
import {APP_GUARD} from "@nestjs/core";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './modules/auth/auth.module';
import * as process from "node:process";
import {User} from "./DAL/entities/User.entity";
import {AuthController} from "./modules/auth/auth.controller";
import { Agent } from 'node:https';
import {HttpModule} from "@nestjs/axios";
import {UserInteractionController} from "./modules/databaseInteraction/userInteraction.controller";
import {UsersService} from "./services/databaseInteraction/usersService";
import {UserRole} from "./DAL/entities/UserRole.entity";
import {Role} from "./DAL/entities/Role.entity";
import {File} from "./DAL/entities/File.entity";
import {Song} from "./DAL/entities/Song.entity";
import {Playlist} from "./DAL/entities/Playlist.entity";
import {Bucket} from "./DAL/entities/Bucket.entity";

const httpsAgent = new Agent({ rejectUnauthorized: false });

@Module({
  imports: [
      ThrottlerModule.forRoot([{
        ttl: 60000,
        limit: 200,
      }]),
      ConfigModule.forRoot({
          envFilePath: ".env",
          isGlobal: true,
      }),
      TypeOrmModule.forRoot({
          type: "postgres",
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          autoLoadEntities: true,
          synchronize: false,
          entities: ['dist/DAL/entities/**/*.entity.ts'],
      }),
      TypeOrmModule.forFeature([User, UserRole, Role, File, Song, Playlist, Bucket]),
      AuthModule,
      HttpModule.register({
          httpsAgent,
      }),
  ],
  controllers: [AuthController, UserInteractionController],
  providers: [
      {
        provide: APP_GUARD,
        useClass: ThrottlerGuard,
      },
      UsersService
  ],
})
export class AppModule {}
