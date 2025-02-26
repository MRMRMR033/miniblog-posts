import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreatePostDto {
    @ApiProperty({description: "Titulo del post.", minimum: 4})
    @IsString()
    @MinLength(4, {message: "El titulo de el post es muy corto, minimo debe tener 4 caractecres."})
    @IsNotEmpty()
    title: string

    @ApiProperty({description:"Descripcion del post.",minimum: 10})
    @IsString()
    @MinLength(10, { message: 'La descripcion es muy corta, debe tener por lo menos 10 caracteres.' })
    @IsNotEmpty()
    description: string
}
