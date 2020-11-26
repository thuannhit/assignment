import { IsNotEmpty, IsEmail } from 'class-validator';
import {UserSimpleInfoDTO } from './user-simple-info.dto'
export class UserEssentialInfoDTO extends UserSimpleInfoDTO{
    @IsNotEmpty()
    password: string;
}