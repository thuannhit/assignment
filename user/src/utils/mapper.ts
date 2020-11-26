// import { UserLoginReqDTO, UserRegisterResDTO, UserSimpleDTO, UserTokenDTO } from '@modules/user/dto';
import { UserEntity } from '../entities/user.entity';
import { UserFullResDTO } from '../dtos/user-full-info-response.dto'
import { IUserEssentialInfo } from '../interfaces/user-esstential-info.interface'
// import { UserTokenEntity as UserTokenEntity } from '@modules/user/user-token.entity';

// export const toUserTokenDTO = (data: UserTokenEntity): UserTokenDTO => {
//     const { id, userId, tokenType, tokenValue } = data;

//     const userToken: UserTokenDTO = {
//         id, userId, tokenValue, tokenType
//     }

//     return userToken;
// };

// export const toUserLoginResDto = (data: UserEntity): UserLoginReqDTO => {
//     const { id, name, email } = data;

//     let userLoginDto: UserLoginReqDTO = {
//         id,
//         userName: name,
//         email,
//     };

//     return userLoginDto;
// };

export const toFullUserResDTO = (data: UserEntity): UserFullResDTO => {
    const { _id, email, user_name, _role_id, name, phone_number } = data;

    let userFullInfo: UserFullResDTO = {
        _id, email, user_name, _role_id, name, phone_number
    };

    return userFullInfo;
};

export const toEssentialUserInfoResDTO = (data: UserEntity): IUserEssentialInfo => {
    const { _id, email, user_name, password } = data;

    let userFullInfo: IUserEssentialInfo = {
        _id, email, user_name, password
    };

    return userFullInfo;
};

// export const toUserRegisterResDTO = (data: UserEntity | undefined): UserRegisterResDTO | undefined => {
//     if (data === undefined) {
//         return undefined
//     }
//     const { id, name, email, subGroupId, subGroupRole, groupId, groupRole, companyId, companyRole, tel, passRemindKey, passRemindDate, createdBy, updatedBy } = data;
//     return {
//         id, name, email, subGroupId, subGroupRole, companyId,
//         companyRole, tel, groupId, groupRole, createdBy, updatedBy
//     };;
// };