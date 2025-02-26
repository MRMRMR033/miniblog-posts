import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({example: "Jon Doe", description: "Nombre del usuario."})
    @IsOptional()
    @IsString()
    name?: string;
    
    @ApiProperty({example: "example@email.com", description: "Correo del usuario."})
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({example: "12345", description: "Contrasena del usuario."})
    @IsOptional()
    @IsString()
    password?: string;
}
