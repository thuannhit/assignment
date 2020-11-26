import { IUser } from '../user.interface';

export class ServiceUserCreateDTO {
  status: number;
  message: string;
  user: IUser | null;
  errors: {[key: string]: any};
}
