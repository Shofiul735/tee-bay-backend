import { PrismaService } from '@app/prisma';
import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { LoginUserDto } from './dtos/login-user.dto';
import { emit } from 'process';
import { JwtService } from '@nestjs/jwt';
import { LoginUser } from './Graphql/login-user.type';
import { plainToClass } from 'class-transformer';

@Injectable({
  scope: Scope.REQUEST,
})
export class UserService {
  private readonly _scrypt = promisify(scrypt);
  constructor(
    private readonly dataService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findUserById(id: string) {
    const user = this.dataService.user.findFirstOrThrow({
      where: {
        id: id,
      },
    });
    return user;
  }

  async loginUser(loginInfo: LoginUserDto) {
    const user = await this.dataService.user.findUniqueOrThrow({
      where: {
        email: loginInfo.email,
      },
    });
    if (!this.matchPassword(user.password, loginInfo.password)) {
      throw new BadRequestException(
        `Wrong password. email: ${loginInfo.email}`,
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const accesToken = await this.jwtService.signAsync(payload);

    const payloadDto = plainToClass(
      LoginUser,
      {
        ...user,
        jwtToken: accesToken,
      },
      {
        excludeExtraneousValues: true,
      },
    );

    return payloadDto;
  }

  async createUser(create: Prisma.UserCreateInput) {
    const password = await this.passwordHashing(create.password);
    create.password = password;
    return await this.dataService.user.create({
      data: create,
    });
  }

  private async passwordHashing(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await this._scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
    return result;
  }

  private async matchPassword(dbPassword: string, givenPassword: string) {
    const [slat, storedHash] = dbPassword.split('.');

    const hash = (await this._scrypt(givenPassword, slat, 32)) as Buffer;

    return storedHash !== hash.toString('hex');
  }
}
