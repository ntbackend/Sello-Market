import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Yunusobod 22' })
  address?: string;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 69.84851654465 })
  longitude?: number;

  @IsNumber()
  @IsOptional()
  @ApiPropertyOptional({ example: 42.16545415845 })
  latitude?: number;
}