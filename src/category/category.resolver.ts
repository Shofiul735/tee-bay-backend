import { Query, Resolver } from '@nestjs/graphql';
import { CategoryType } from 'src/product/graphql/category.type';
import { CategoryService } from './category.service';

@Resolver(() => CategoryType)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryType])
  async getAllCategory() {
    return await this.categoryService.getAll();
  }
}
