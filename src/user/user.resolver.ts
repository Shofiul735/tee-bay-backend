import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserType } from './Graphql/user.type';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserType } from './Graphql/login-user.type';
import { LoginUserDto } from './dtos/login-user.dto';
import { GetUserType } from './Graphql/get-user.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => GetUserType)
  async getUserById(@Args('id') id: string): Promise<GetUserType> {
    return await this.userService.findUserById(id);
  }

  @Query(() => LoginUserType)
  async loginUser(
    @Args('loginUser') loginUser: LoginUserDto,
  ): Promise<GetUserType> {
    return this.userService.loginUser(loginUser);
  }

  @Mutation(() => GetUserType)
  async createUser(@Args('user') user: CreateUserDto): Promise<GetUserType> {
    return await this.userService.createUser(user);
  }
}
