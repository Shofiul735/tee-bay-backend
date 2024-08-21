import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductType } from './graphql/product.type';
import { ProductInpurtType } from './graphql/product.input';
import { Prisma } from '@prisma/client';

@Resolver(() => ProductType)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => ProductType)
  addProduct(@Args('product') propduct: ProductInpurtType) {
    const connect = propduct.categoriIds.map((i) => {
      return { id: i };
    });
    const dto = {
      ...propduct,
      categories: {
        connect,
      },
    };
    delete dto.categoriIds;

    return this.productService.createProduct(dto);
  }
}
