import { ApiProperty } from '@nestjs/swagger';
import { IOrder } from '../order.interface';

export class CreateOrderResponseDto {
  @ApiProperty({example: 'order_create_success'})
  message: string;
  @ApiProperty({
    example: {
      order: {
        notification_id: null,
        name: 'test order',
        description: 'test order description',
        start_time: +new Date(),
        duration: 90000,
        user_id: '111111111',
        is_solved: false,
        created_at: +new Date(),
        updated_at: +new Date(),
        id: '1111111233'
      }
    },
    nullable: true
  })
  data: {
      order: IOrder;
  };
  @ApiProperty({example: null, nullable: true})
  errors: {[key: string]: any};
}
