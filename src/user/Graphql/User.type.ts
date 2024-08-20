import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GetUserType } from './get-user.type';

@ObjectType('user')
export class UserType extends GetUserType {
  @Field()
  password: string;
}
