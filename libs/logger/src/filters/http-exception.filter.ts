import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLoggerService } from '../logger.service';

// Define an interface for the error message structure
interface ErrorResponse {
  message: string;
  error: string;
  path?: string;
  stack?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: ErrorResponse;

    if (exception instanceof HttpException) {
      const responseData = exception.getResponse();
      // Ensure responseData is an object
      message =
        typeof responseData === 'object'
          ? (responseData as ErrorResponse)
          : { message: String(responseData), error: 'Unknown Error' };
    } else {
      message = {
        message: 'Internal Server Error',
        error: 'Internal Server Error',
        path: request.url,
        stack: exception instanceof Error ? exception.stack : undefined,
      };
    }

    this.logger.error(
      `Exception thrown: ${JSON.stringify(message)} - Method: ${request.method} - Path: ${request.url}`,
      exception instanceof Error ? exception.stack : '',
      'HttpExceptionFilter',
    );

    // Return the error response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.url,
      ...message,
    });
  }
}
