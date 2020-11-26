import { IsNotEmpty, IsEmail } from 'class-validator';
export class UserSimpleInfoDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    _id: number;

    @IsNotEmpty()
    user_name: string;
}