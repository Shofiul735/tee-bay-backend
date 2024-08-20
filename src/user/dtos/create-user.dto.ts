import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(64)
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  phoneNumber: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
