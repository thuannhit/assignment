import { ApiProperty } from '@nestjs/swagger';

export class OrderIdDto {
  @ApiProperty()
  id: string
}
