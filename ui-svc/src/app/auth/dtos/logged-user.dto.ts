import { UserDTO } from './user.dto'
import { JwtTokensDTO } from './jwt-tokens.dto'
export class LoggedUser extends JwtTokensDTO {
    userInfo: UserDTO
}