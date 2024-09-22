import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateMarketDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Sello Market' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Sello market description' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'logo.png' })
  logo: string;

  @IsString()
  @IsOptional()
  userId?: string;
}