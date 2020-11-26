import { ApiProperty } from '@nestjs/swagger';
import { IOrder } from '../order.interface';

export class UpdateOrderResponseDto {
  @ApiProperty({ example: 'order_update_by_id_success' })
  message: string;
  @ApiProperty({
    example: {
      order: {
        notification_id: null,
        name: 'test order',
        description: 'test order description',
        start_time: +new Date(),
        duration: 90000,
        user_id: '5d987c3bfb881ec86b476bca',
        is_solved: false,
        created_at: +new Date(),
        updated_at: +new Date(),
        id: '5d987c3bfb881ec86b476bcc'
      }
    },
    nullable: true
  })
  data: {
    order: IOrder;
  };
  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
