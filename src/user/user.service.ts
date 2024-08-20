import { PrismaService } from '@app/prisma';
import { Injectable, Scope } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable({
  scope: Scope.REQUEST,
})
export class UserService {
  private readonly _scrypt = promisify(scrypt);
  constructor(private readonly dataService: PrismaService) {}

  async findUserById(id: string) {
    const user = this.dataService.user.findFirstOrThrow({
      where: {
        id: id,
      },
    });
    return user;
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
}
