import { IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class UserFullResDTO {
    @IsNotEmpty()
    _id: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    user_name: string;

    @IsNotEmpty()
    _role_id:number; 
    
    @IsNotEmpty()
    name: string
    
    @IsNotEmpty()
    phone_number: string
}