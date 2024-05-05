import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {corsOptions} from "./config/corsOptions";
import * as process from "node:process";
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('./secrets/cert.key'),
  cert: fs.readFileSync('./secrets/cert.crt'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true, httpsOptions: httpsOptions});

  app.enableCors(corsOptions);

  const options = new DocumentBuilder()
      .setTitle('Admin API')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
    console.log(`\nAdmin API Started at: https://${process.env.APP_HOST}:${process.env.APP_PORT}/
      \nSwagger: https://${process.env.APP_HOST}:${process.env.APP_PORT}/swagger`);
  });
}
bootstrap();
