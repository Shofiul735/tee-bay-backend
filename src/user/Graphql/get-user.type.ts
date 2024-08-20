import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('GetUserType')
export class GetUserType {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  address: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;
}
