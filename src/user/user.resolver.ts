import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserType } from './Graphql/User.type';
import { UserService } from './user.service';
import { GetUserType } from './Graphql/GetUser.type';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => GetUserType)
  async getUserById(@Args('id') id: string): Promise<UserType> {
    return await this.userService.findUserById(id);
  }
}
