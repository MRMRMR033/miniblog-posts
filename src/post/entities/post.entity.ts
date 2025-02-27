import { ApiProperty } from "@nestjs/swagger"
import { User, Comment } from "./relation.entity"

export class Post {
    @ApiProperty()
    id: number
    
    @ApiProperty()
    title: string
    
    @ApiProperty()
    description: string

}

export class PostEntityResult {
    @ApiProperty()
    id: number

    @ApiProperty()
    title: string
    @ApiProperty()
    description: string

    @ApiProperty()
    user: User

    @ApiProperty()
    Comment: Comment
}