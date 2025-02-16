import {IsEmail, IsString, MinLength} from "class-validator"
export class CreateUserDto {
    
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, {message: "La contrasena requiere por lo menos 6 caracteres."})
    password: string
}
