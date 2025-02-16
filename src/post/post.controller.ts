import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ForbiddenException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postService.create({
      ...createPostDto,
      userId: req.user.sub})
  }

  @Get('user/')
  finAllByUser(@Request() req){
    const userId = req.user.sub
    return this.postService.findAllByUser(userId)
  }
  
  @Public()
  @Get()
  findAll() {
    return this.postService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req) {
    const userId = req.user.id;
    const post = await this.postService.findOne(id);

    if(post.userId !== userId){
      throw new ForbiddenException('No puedes realizar la actualizacion.')
    }

    return this.postService.update(id, updatePostDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const post = await this.postService.findOne(id);
    if(post.userId !== id){
      throw new ForbiddenException('No puede eliminar este post por que no te pertenese.')
    }
    return this.postService.remove(id);
  }
}
