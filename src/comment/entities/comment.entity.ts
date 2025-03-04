import { ApiProperty } from "@nestjs/swagger";


export class UserRelation {
    @ApiProperty()
    name: string
}

export class CommentEntity {

    
    @ApiProperty()
    id: number

    @ApiProperty()
    postId: number

    @ApiProperty()
    text: string

    @ApiProperty()
    user: UserRelation
}
