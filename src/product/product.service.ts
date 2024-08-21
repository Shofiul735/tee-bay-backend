import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    constructor(private readonly dataService: PrismaService){}
}
