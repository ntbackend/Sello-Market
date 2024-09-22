import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({ example: 'ibrohimjoraboyev2008@gmail.com'})
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6)
  otp: string;
}