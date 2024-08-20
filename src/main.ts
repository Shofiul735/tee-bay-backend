import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

import { HttpExceptionFilter } from '@app/logger/filters/http-exception.filter';
import { CustomLoggerService } from '@app/logger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.ALLOW_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter(new CustomLoggerService()));

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
  });
}
bootstrap();
