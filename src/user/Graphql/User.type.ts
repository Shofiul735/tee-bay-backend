import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType('user')
export class UserType {
  @Field(() =>ID)
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
  
  @Field()
  password: string;
}
