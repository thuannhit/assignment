import {
  Controller,
  Inject,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

import { Authorization } from './decorators/authorization.decorator';
import { Permission } from './decorators/permission.decorator';

import { IAuthorizedRequest } from './interfaces/common/authorized-request.interface';
import { IServiceOrderCreateResponse } from './interfaces/order/service-order-create-response.interface';
import { IServiceOrderDeleteResponse } from './interfaces/order/service-order-delete-response.interface';
import {
  IServiceOrderSearchByUserIdResponse
} from './interfaces/order/service-order-search-by-user-id-response.interface';
import { IServiceOrderUpdateByIdResponse } from './interfaces/order/service-order-update-by-id-response.interface';
import { GetOrdersResponseDto } from './interfaces/order/dto/get-orders-response.dto';
import { CreateOrderResponseDto } from './interfaces/order/dto/create-order-response.dto';
import { DeleteOrderResponseDto } from './interfaces/order/dto/delete-order-response.dto';
import { UpdateOrderResponseDto } from './interfaces/order/dto/update-order-response.dto';
import { CreateOrderDto } from './interfaces/order/dto/create-order.dto';
import { UpdateOrderDto } from './interfaces/order/dto/update-order.dto';
import { OrderIdDto } from './interfaces/order/dto/order-id.dto';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {

  constructor(
    @Inject('ORDER_SERVICE') private readonly orderServiceClient: ClientProxy
  ) { }

  @Get()
  @Authorization(true)
  @Permission('order_search_by_user_id')
  @ApiOkResponse({
    type: GetOrdersResponseDto,
    description: 'List of order for signed in user'
  })
  public async getOrders(
    @Req() request: IAuthorizedRequest
  ): Promise<GetOrdersResponseDto> {
    const userInfo = request.user;

    const ordersResponse: IServiceOrderSearchByUserIdResponse = await this.orderServiceClient.send(
      'order_search_by_user_id',
      userInfo._id
    ).toPromise();

    return {
      message: ordersResponse.message,
      data: {
        orders: ordersResponse.orders
      },
      errors: null
    };
  }

  @Post()
  @Authorization(true)
  @Permission('order_create')
  @ApiCreatedResponse({
    type: CreateOrderResponseDto
  })
  public async createOrder(
    @Req() request: IAuthorizedRequest,
    @Body() orderRequest: CreateOrderDto
  ): Promise<CreateOrderResponseDto> {
    const userInfo = request.user;
    const createOrderResponse: IServiceOrderCreateResponse = await this.orderServiceClient.send(
      'order_create',
      Object.assign(orderRequest, { user_id: userInfo._id })
    ).toPromise();

    if (createOrderResponse.status !== HttpStatus.CREATED) {
      throw new HttpException({
        message: createOrderResponse.message,
        data: null,
        errors: createOrderResponse.errors
      }, createOrderResponse.status);
    }

    return {
      message: createOrderResponse.message,
      data: {
        order: createOrderResponse.order
      },
      errors: null
    };
  }

  @Delete(':id')
  @Authorization(true)
  @Permission('order_delete_by_id')
  @ApiOkResponse({
    type: DeleteOrderResponseDto
  })
  public async deleteOrder(
    @Req() request: IAuthorizedRequest,
    @Param() params: OrderIdDto
  ): Promise<DeleteOrderResponseDto> {
    const userInfo = request.user;

    const deleteOrderResponse: IServiceOrderDeleteResponse = await this.orderServiceClient.send(
      'order_delete_by_id',
      {
        id: params.id,
        userId: userInfo._id
      }
    ).toPromise();

    if (deleteOrderResponse.status !== HttpStatus.OK) {
      throw new HttpException({
        message: deleteOrderResponse.message,
        errors: deleteOrderResponse.errors,
        data: null
      }, deleteOrderResponse.status);
    }

    return {
      message: deleteOrderResponse.message,
      data: null,
      errors: null
    };
  }

  @Put(':id')
  @Authorization(true)
  @Permission('order_update_by_id')
  @ApiOkResponse({
    type: UpdateOrderResponseDto
  })
  public async updateOrder(
    @Req() request: IAuthorizedRequest,
    @Param() params: OrderIdDto,
    @Body() orderRequest: UpdateOrderDto
  ): Promise<UpdateOrderResponseDto> {
    const userInfo = request.user;
    const updateOrderResponse: IServiceOrderUpdateByIdResponse = await this.orderServiceClient.send(
      'order_update_by_id',
      {
        id: params.id,
        userId: userInfo._id,
        order: orderRequest
      }
    ).toPromise();

    if (updateOrderResponse.status !== HttpStatus.OK) {
      throw new HttpException({
        message: updateOrderResponse.message,
        errors: updateOrderResponse.errors,
        data: null
      }, updateOrderResponse.status);
    }

    return {
      message: updateOrderResponse.message,
      data: {
        order: updateOrderResponse.order
      },
      errors: null
    };
  }

}
