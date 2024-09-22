import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Techniques' })
  name?: string;
}