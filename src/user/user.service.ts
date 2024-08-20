import { PrismaService } from '@app/prisma';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.REQUEST,
})
export class UserService {
  constructor(private readonly dataService: PrismaService) {}

  async findUserById(id: string) {
    const user = this.dataService.user.findFirstOrThrow({
      where: {
        id: id,
      },
    });
    return user;
  }
}
