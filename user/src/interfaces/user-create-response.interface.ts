import { IUser } from './user.interface';
import {UserFullResDTO} from '../dtos/user-full-info-response.dto'
export interface IUserCreateResponse {
  status: number;
  message: string;
  user: UserFullResDTO | null;
  errors: {[key: string]: any} | null;
}
