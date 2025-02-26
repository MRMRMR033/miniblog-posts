import {IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
export class CreateUserDto {
    @ApiProperty({description: "Nombre del usuario",minimum: 4})
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    name: string

    @ApiProperty({example: "example@email.com"})
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @MinLength(6, {message: "La contrasena requiere por lo menos 6 caracteres."})
    password: string
}
