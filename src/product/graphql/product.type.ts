import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';

@ObjectType()
export class ProductType {
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

  @Field(() => [Int])
  categoriIds: number[];
}
