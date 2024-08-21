import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly dataService: PrismaService) {}

  async getAll() {
    const category = await this.dataService.category.findMany();
    return category;
  }
}
