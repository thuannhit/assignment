import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({example: 'test order'})
  name: string;
  @ApiProperty({example: 'test order description'})
  description: string;
  @ApiProperty({example: +new Date()})
  start_time: number;
  @ApiProperty({example: 90000})
  duration: number;
}
