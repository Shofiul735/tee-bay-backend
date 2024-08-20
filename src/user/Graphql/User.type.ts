import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GetUserType } from './get-user.type';

@ObjectType('UserType')
export class UserType extends GetUserType {
  @Field()
  password: string;
}
