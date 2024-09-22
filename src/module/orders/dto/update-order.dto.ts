import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../../../schemas';

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsArray()
  @IsOptional()
  @ApiPropertyOptional({
    example: [
      { productId: '66f0453554c8ce590f21e705', quantity: 2 },
      { productId: '66f0453554c8ce590f21e705', quantity: 1 },
    ],
    description: 'Updated array of products in the order',
  })
  items?: { productId: string; quantity: number }[];
}