import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly dataService: PrismaService) {}

  async createProduct(create: Prisma.ProductCreateInput) {
    try {
      console.log('Service');
      console.log(create);
      const x = await this.dataService.product.create({
        data: create,
      });
      console.log(x);
      return x;
    } catch (ex) {
      console.log(ex);
    }
  }
}
