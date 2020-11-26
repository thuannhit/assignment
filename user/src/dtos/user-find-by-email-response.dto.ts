import { UserFullResDTO } from './user-full-info-response.dto'
export interface UserFindByEmailDTO {
  status: number;
  message: string;
  user: UserFullResDTO | null;
  errors: { [key: string]: any } | null;
}
