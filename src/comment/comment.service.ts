import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService){}
  async create(createCommentDto: CreateCommentDto & {userId: number, postId: number}) {
    try{
      return await this.prismaService.comment.create({data: createCommentDto})
    }
    catch{
      throw new BadRequestException("error al crear el comentario.")
    }
  }

  findAll(postId: number) {
    try{
      return this.prismaService.comment.findMany({where: {postId: Number(postId)}, select:
      {
        id: true,
        postId: true,
        text: true,
        user: {select: {name: true}}
      }})
    }catch{
      throw new BadRequestException("Error al buscar todos los comentairos.")
    }
  }

  findOne(id: number) {
    try{
      return this.prismaService.comment.findUnique({where: {id}})
    }catch{
      throw new BadRequestException("")
    }
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    try{
      return this.prismaService.comment.update({where: {id}, data: {...updateCommentDto}})
    }catch{
      throw new BadRequestException("Error al modificar el comentario, vuelve a intentarlo.")
    }
  }

  remove(id: number) {
    try{
      return this.prismaService.comment.delete({where: {id}})
    }catch{
      throw new BadRequestException("Error al elminar el comentario, vuelve a intentarlo.")
    }
  }
}
