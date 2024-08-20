import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { PrismaModule } from '@app/prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {}
