import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: "ibrohimjoraboyev2008@gmail.com"})
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({example: "10116645"})
    password: string;
}