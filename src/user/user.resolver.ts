import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UserType } from './Graphql/user.type';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserType } from './Graphql/login-user.type';
import { LoginUserDto } from './dtos/login-user.dto';
import { GetUserType } from './Graphql/get-user.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'libs/guards/auth.guard';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => GetUserType)
  @UseGuards(AuthGuard)
  async getUserById(@Args('id') id: string): Promise<GetUserType> {
    return await this.userService.findUserById(id);
  }

  @Query(() => LoginUserType)
  async loginUser(
    @Args('loginUser') loginUser: LoginUserDto,
    @Context() context,
  ): Promise<LoginUserType> {
    const user = await this.userService.loginUser(loginUser);

    if (user) {
      const token = user.jwtToken;
      context.res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use `secure` in production (HTTPS)
        sameSite: 'Lax',
        maxAge: 3600000,
      });
    }
    return user;
  }

  @Mutation(() => GetUserType)
  async createUser(@Args('user') user: CreateUserDto): Promise<GetUserType> {
    return await this.userService.createUser(user);
  }
}
