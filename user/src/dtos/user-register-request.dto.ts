import { IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class UserRegisterReqDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    user_name: string;

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    repeat_password: string
}