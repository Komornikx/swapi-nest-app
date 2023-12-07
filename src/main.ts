import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  console.log(process.env.API_PORT);
  console.log(process.env.API_HOST);

  await app.listen(process.env.API_PORT, process.env.API_HOST);
}
bootstrap();
