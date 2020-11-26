import { UserSimpleInfoDTO } from '../dtos/user-simple-info.dto'
export interface ILoginUserResponse {
  message: string;

  status: number;

  data: {
    access_token: string,
    refresh_token: string,
    user: UserSimpleInfoDTO
  };

  errors: { [key: string]: any };
}
