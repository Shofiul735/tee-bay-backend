import { Field, Int, Float, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ProductInpurtType {
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
