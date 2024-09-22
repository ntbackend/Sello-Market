
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../schemas';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: "Ibrohim Jo'raboyev" })
    fullname: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: "ibrohimjoraboyev2008@gmail.com" })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({ example: "10116645" })
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
