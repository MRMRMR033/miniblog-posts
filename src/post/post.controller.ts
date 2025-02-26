import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ForbiddenException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Public } from 'src/decorators/public.decorator';
import { Post as PostEntity } from './entities/post.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req): Promise<PostEntity> {
    return this.postService.create({
      ...createPostDto,
      userId: req.user.sub})
  }

  @ApiResponse({status: 200, description: "retorna todos los post del usuario", type: [PostEntity]})
  @Get('user/')
  finAllByUser(@Request() req): Promise<PostEntity[]>{
    const userId = req.user.sub
    return this.postService.findAllByUser(userId)
  }
  
  @ApiResponse({status: 200, description: "retorna todos los post.", type: [PostEntity]})
  @Public()
  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req): Promise<PostEntity> {
    const userId = req.user.id;
    const post = await this.postService.findOne(id);

    if(post.userId !== userId){
      throw new ForbiddenException('No puedes realizar la actualizacion.')
    }

    return this.postService.update(id, updatePostDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req): Promise<PostEntity> {
    const post = await this.postService.findOne(id);
    if(post.userId !== id){
      throw new ForbiddenException('No puede eliminar este post por que no te pertenese.')
    }
    return this.postService.remove(id);
  }
}
