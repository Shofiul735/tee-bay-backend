import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

@Injectable({ scope: Scope.DEFAULT })
export class CustomLoggerService implements LoggerService {
  private readonly logger: Logger;
  constructor() {
    this.logger = createLogger({
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, context, trace }) => {
          return `${timestamp} [${level}] ${context}: ${message} ${trace}`;
        }),
      ),
      transports: [
        new transports.DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }
}
