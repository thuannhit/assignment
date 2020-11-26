import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IOrder } from '../interfaces/order.interface';
import { IOrderUpdateParams } from '../interfaces/order-update-params.interface';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel('Order') private readonly orderModel: Model<IOrder>
  ) {}

  public async getOrdersByUserId(userId: string): Promise<IOrder[]> {
    return this.orderModel.find({user_id: userId}).exec();
  }

  public async createOrder(orderBody: IOrder): Promise<IOrder> {
    const orderModel = new this.orderModel(orderBody);
    return await orderModel.save();
  }

  public async findOrderById(id: string) {
    return await this.orderModel.findById(id);
  }

  public async removeOrderById(id: string) {
    return await this.orderModel.findOneAndDelete({_id: id});
  }

  public async updateOrderById(id: string, params: IOrderUpdateParams): Promise<IOrder> {
    return await this.orderModel.updateOne({_id: id}, params);
  }

}
