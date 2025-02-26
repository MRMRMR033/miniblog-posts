import { ApiProperty } from "@nestjs/swagger"
export class Post {
    @ApiProperty()
    id: number
    
    @ApiProperty()
    title: string
    
    @ApiProperty()
    description: string
}
