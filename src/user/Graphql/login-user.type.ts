import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('getUser')
export class LoginUser {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  jwtToken: string;
}
