import { IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class UserFindByEmailReqDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}