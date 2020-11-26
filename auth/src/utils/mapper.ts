import { UserEssentialInfoDTO } from '../dtos/user-esstential-info.dto';
import { UserSimpleInfoDTO } from '../dtos/user-simple-info.dto'

export const toSimpleUserDto = (data: UserEssentialInfoDTO): UserSimpleInfoDTO => {
    const { _id, email, user_name } = data;

    let userLoginDto: UserSimpleInfoDTO = {
        _id,
        email,
        user_name
    };

    return userLoginDto;
};
