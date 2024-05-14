import { Module } from '@nestjs/common';
import {ThrottlerModule, ThrottlerGuard} from '@nestjs/throttler';
import {APP_GUARD} from "@nestjs/core";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from './modules/auth/auth.module';
import * as process from "node:process";
import {User} from "./DAL/entities/russianSpotifyDbEntities/User.entity";
import {AuthController} from "./modules/auth/controllers/auth.controller";
import { Agent } from 'node:https';
import {HttpModule} from "@nestjs/axios";
import {UserInteractionController} from "./modules/databaseInteraction/controllers/userInteraction.controller";
import {UsersService} from "./services/databaseInteraction/usersService";
import {UserRole} from "./DAL/entities/russianSpotifyDbEntities/UserRole.entity";
import {Role} from "./DAL/entities/russianSpotifyDbEntities/Role.entity";
import {File} from "./DAL/entities/russianSpotifyDbEntities/File.entity";
import {Song} from "./DAL/entities/russianSpotifyDbEntities/Song.entity";
import {Playlist} from "./DAL/entities/russianSpotifyDbEntities/Playlist.entity";
import {Bucket} from "./DAL/entities/russianSpotifyDbEntities/Bucket.entity";
import {BucketSong} from "./DAL/entities/russianSpotifyDbEntities/BucketSong.entity";
import {BucketService} from "./services/databaseInteraction/bucketService";
import {BucketInteractionController} from "./modules/databaseInteraction/controllers/bucketInteraction.controller";
import {SongInteractionController} from "./modules/databaseInteraction/controllers/songInteraction.controller";
import {SongService} from "./services/databaseInteraction/songService";
import {SongUser} from "./DAL/entities/russianSpotifyDbEntities/SongUser.entity";
import {SubscriptionService} from "./services/databaseInteraction/subscriptionService";
import {Subscribe} from "./DAL/entities/russianSpotifyDbEntities/Subscribe.entity";
import {
    SubscriptionInteractionController
} from "./modules/databaseInteraction/controllers/subscriptionInteraction.controller";
import {PlaylistInteractionController} from "./modules/databaseInteraction/controllers/playlistInteraction.controller";
import {PlaylistService} from "./services/databaseInteraction/playlistService";
import {FileService} from "./services/databaseInteraction/fileService";
import {FileInteractionController} from "./modules/databaseInteraction/controllers/fileInteraction.controller";
import {PlaylistSong} from "./DAL/entities/russianSpotifyDbEntities/PlaylistSong.entity";
import {FileExtender} from "./interceptors/FileInterceptor";
import {StatisticModule} from "./modules/statistic/statistic.module";
import { config } from 'dotenv';
const httpsAgent = new Agent({ rejectUnauthorized: false });

config();

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
          entities: ['dist/DAL/entities/russianSpotifyDbEntities/**/*.entity.ts'],
      }),
      TypeOrmModule.forFeature([
          User,
          UserRole,
          Role,
          File,
          Song,
          Playlist,
          Bucket,
          BucketSong,
          SongUser,
          Subscribe,
          PlaylistSong
      ]),
      StatisticModule,
      AuthModule,
      HttpModule.register({
          httpsAgent,
      }),
  ],
  controllers: [
      AuthController,
      UserInteractionController,
      BucketInteractionController,
      SongInteractionController,
      SubscriptionInteractionController,
      PlaylistInteractionController,
      FileInteractionController,
  ],
  providers: [
      {
        provide: APP_GUARD,
        useClass: ThrottlerGuard,
      },
      UsersService,
      BucketService,
      SongService,
      SubscriptionService,
      PlaylistService,
      FileService,
      FileExtender
  ],
})
export class AppModule {}
