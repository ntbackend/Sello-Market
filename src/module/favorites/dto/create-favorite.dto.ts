import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @IsUUID()
  @ApiProperty({ example: '66f0453554c8ce590f21e705' })
  productId: string;
}
