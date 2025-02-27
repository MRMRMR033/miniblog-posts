import { ApiProperty } from "@nestjs/swagger"

export class User {
    @ApiProperty()
    name: string
}

export class Comment{
    @ApiProperty()
    texto: string
    @ApiProperty()
    user: User
}