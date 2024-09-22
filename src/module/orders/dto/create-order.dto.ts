import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    example: [
      { productId: '66f0453554c8ce590f21e705', quantity: 2 },
      { productId: '66f0453554c8ce590f21e705', quantity: 1 },
    ],
    description: 'Array of products in the order with quantities',
  })
  items: { productId: string; quantity: number }[];
}