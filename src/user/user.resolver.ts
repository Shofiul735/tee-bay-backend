import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserType } from './Graphql/user.type';
import { UserService } from './user.service';
import { GetUserType } from './Graphql/get-user.type';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUser } from './Graphql/login-user.type';
import { LoginUserDto } from './dtos/login-user.dto';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => GetUserType)
  async getUserById(@Args('id') id: string): Promise<UserType> {
    return await this.userService.findUserById(id);
  }

  @Mutation(() => GetUserType)
  createUser(@Args('createUser') createUser:CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  
}
