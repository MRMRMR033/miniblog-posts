import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ForbiddenException, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { PostEntityResult } from './entities/post.entity';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserPostGuard } from './guards/post.guard';
import { Public } from 'src/decorators/public.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  
  @ApiBearerAuth()
  @ApiResponse({status: 201, description: "Crea un post nuevo.", type: PostEntity})
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req): Promise<PostEntity> {
    return this.postService.create({
      ...createPostDto,
      userId: req.user.sub})
  }

  @ApiResponse({status: 200, description: "retorna todos los post del usuario", type: [PostEntity]})
  @Public()
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

  @ApiBearerAuth()
  @ApiResponse({status: 200, description: "retorna uno de los usuarios mediante su id.", type: [PostEntityResult]})
  @Get(':id')
  findOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiResponse({status: 200, description: "Busca mediante id y atualiza el post.", type: PostEntity})
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

  @ApiBearerAuth()
  @ApiResponse({status: 200, description: "elimina un post mediante su id.", type: PostEntity})
  @UseGuards(UserPostGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req): Promise<PostEntity> {
    const post = await this.postService.findOne(id);
    if(post.userId !== id){
      throw new ForbiddenException('No puede eliminar este post por que no te pertenese.')
    }
    return this.postService.remove(id);
  }
}
