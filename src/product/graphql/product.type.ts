import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Category } from './category.type'; // Import the Category type if you have it defined

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  productTitle: string;

  @Field({ nullable: true })
  textureDescription?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float, { nullable: true })
  rentPrice?: number;

  @Field({ nullable: true })
  rentUnit?: string;

  @Field(() => [Category])
  categories: Category[];
}
