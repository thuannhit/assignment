import { ApiProperty } from '@nestjs/swagger';

export class CreateUserReqDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'test1@denrox.com'
  })
  email: string;
  
  @ApiProperty({
    minLength: 6,
    example: 'test11'
  })
  password: string;
};
