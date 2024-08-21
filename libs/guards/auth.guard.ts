//https://chatgpt.com/share/c8fdf127-b6e7-48e1-8f7a-ae3ad0aacafc

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new GraphQLError('Unauthorized', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: {
            status: 401,
          },
        },
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // Attach the payload to the request object, making it available to the resolver
      request.user = payload;
    } catch (error) {
      // Enhanced logging for debugging
      console.error('Token verification error:', error.message);

      throw new GraphQLError('Unauthorized', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: {
            status: 401,
          },
        },
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request?.headers?.authorization;
    console.log(request.headers);
    console.log(authHeader);
    if (!authHeader) {
      console.warn('Authorization header is missing');
      return undefined;
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      console.warn('Invalid token type');
      return undefined;
    }

    if (!token) {
      console.warn('Token is missing in the authorization header');
      return undefined;
    }

    return token;
  }
}
