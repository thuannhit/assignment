import { ApiProperty } from '@nestjs/swagger';
import { IOrder } from '../order.interface';

export class GetOrdersResponseDto {
  @ApiProperty({ example: 'order_search_success' })
  message: string;
  @ApiProperty({
    example: {
      orders: [{
        notification_id: null,
        name: 'test order',
        description: 'test order description',
        start_time: +new Date(),
        duration: 90000,
        user_id: '11111111',
        is_solved: false,
        created_at: +new Date(),
        updated_at: +new Date(),
        id: '222222'
      }]
    },
    nullable: true
  })
  data: {
    orders: IOrder[];
  };
  @ApiProperty({ example: 'null' })
  errors: { [key: string]: any };
}
