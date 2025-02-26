import { Controller, Get, Post, Body, Patch, Param, Delete, Request} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('')
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Param('postId') postId: string,
    @Request() req
  ) {
    return this.commentService.create({
      ...createCommentDto,
      userId: req.user.sub,
      postId: Number(postId)
    })
  }

  @Get()
  findAll(@Param('postId') postId: number) {
    return this.commentService.findAll(postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
