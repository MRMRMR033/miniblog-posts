import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
    @ApiProperty({description: "contenido del comentario."})
    @IsString()
    @IsNotEmpty()
    text: string
}
