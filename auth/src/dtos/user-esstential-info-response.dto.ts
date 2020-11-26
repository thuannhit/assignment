import { UserEssentialInfoDTO  } from './user-esstential-info.dto'
export class UserEssentialInfoResDTO {
    status: number
    user: UserEssentialInfoDTO | null
    message: string | null
    error: string | null
}
