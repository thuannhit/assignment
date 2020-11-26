import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserEssentialInfoDTO } from '../dtos/user-esstential-info.dto'
import { UserSimpleInfoDTO } from '../dtos/user-simple-info.dto'
import { UserEssentialInfoResDTO } from '../dtos/user-esstential-info-response.dto'

import { toSimpleUserDto } from '../utils/mapper'
import { isPasswordMatched } from '../utils/auth.utils'

@Injectable()
export class UserService {

    constructor(
        @Inject('USER_SERVICE') private readonly userMicroServiceClient: ClientProxy,
    ) { }

    async getUserIfPasswordMatches(email: string, plainTextPassword: string): Promise<UserSimpleInfoDTO> {
        const response: UserEssentialInfoResDTO = await this.userMicroServiceClient.send('get_essential_user_info', { email: email }).toPromise()
        if (response.user) {
            const user: UserEssentialInfoDTO = response.user
            const passwordMatched = await isPasswordMatched(user.password, plainTextPassword);
            if (passwordMatched) {
                return toSimpleUserDto(user)
            }
        }
        return null
    }
}
