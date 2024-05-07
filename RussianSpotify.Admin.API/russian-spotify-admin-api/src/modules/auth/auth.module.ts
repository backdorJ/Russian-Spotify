import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import {HttpModule} from "@nestjs/axios";
import * as https from "node:https";
import {ConfigModule} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";

@Module({
  controllers: [AuthController],
  imports: [
    HttpModule.register({
      httpAgent: new https.Agent({rejectUnauthorized: false}),
    }),
    ConfigModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: []
})

export class AuthModule {}
