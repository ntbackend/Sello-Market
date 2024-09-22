import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Xasanboy 73' })
  address?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 69.10113345 })
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 42.165036545 })
  latitude: number;
}