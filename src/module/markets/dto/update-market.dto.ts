
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMarketDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Updated Sello Market' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Updated description about the market' })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'updated-logo.png' })
  logo?: string;
}
