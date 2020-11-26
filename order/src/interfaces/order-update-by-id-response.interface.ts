import { IOrder } from './order.interface';

export interface IOrderUpdateByIdResponse {
  status: number;
  message: string;
  order: IOrder | null;
  errors: {[key: string]: any} | null;
}
