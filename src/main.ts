import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

import { HttpExceptionFilter } from '@app/logger/filters/http-exception.filter';
import { CustomLoggerService } from '@app/logger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(CustomLoggerService);
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
