import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GetUserType } from './GetUser.type';

@ObjectType('user')
export class UserType extends GetUserType {
  @Field()
  password: string;
}
