import { IOrder } from './order.interface';

export interface IServiceOrderUpdateByIdResponse {
  status: number;
  message: string;
  order: IOrder | null;
  errors: { [key: string]: any };
}
