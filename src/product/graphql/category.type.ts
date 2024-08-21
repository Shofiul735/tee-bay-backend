import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from './product.type'; // Import the Product type

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Product])
  products: Product[];
}
