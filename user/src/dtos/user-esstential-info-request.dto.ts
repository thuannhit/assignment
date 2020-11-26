import { IsEmail  } from 'class-validator';

export class UserEssentialInfoReqDTO {
    email?: number;

    @IsEmail()
    _id?: string;

}