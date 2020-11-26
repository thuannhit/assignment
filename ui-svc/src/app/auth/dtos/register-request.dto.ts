import {
    IsEmail,
    IsString,
    IsNotEmpty
} from 'class-validator';
export class UserRegisterRequestDTO {
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: number
}