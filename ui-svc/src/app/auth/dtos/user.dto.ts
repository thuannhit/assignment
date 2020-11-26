import {
    IsEmail,
    IsString,
    IsNumber, Allow
} from 'class-validator';
export class UserDTO {
    @IsString()
    userName: string;

    @IsEmail()
    email: string;

    @IsNumber()
    @Allow(null)
    role?: number
}