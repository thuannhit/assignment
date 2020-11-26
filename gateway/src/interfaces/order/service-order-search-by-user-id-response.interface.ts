import { IOrder } from './order.interface';

export interface IServiceOrderSearchByUserIdResponse {
  status: number;
  message: string;
  orders: IOrder[];
}
