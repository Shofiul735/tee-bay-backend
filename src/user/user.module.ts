import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 30 + 's',
        algorithm: 'HS384',
      },
    }),
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
