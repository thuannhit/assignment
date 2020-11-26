import { IOrder } from './order.interface';

export interface IOrderSearchByUserResponse {
  status: number;
  message: string;
  orders: IOrder[];
}
