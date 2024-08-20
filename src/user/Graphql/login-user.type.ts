import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('LoginUserType')
export class LoginUserType {
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
