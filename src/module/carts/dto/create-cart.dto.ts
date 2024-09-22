import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartItemDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '66f0453554c8ce590f21e705' })
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  quantity: number;
}