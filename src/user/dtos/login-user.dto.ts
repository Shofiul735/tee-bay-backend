import { Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto{
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsEmail()
    @IsNotEmpty()
    password: string;
}