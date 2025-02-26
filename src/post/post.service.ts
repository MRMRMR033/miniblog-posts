import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserPostGuard } from './guards/post.guard';

@UseGuards(UserPostGuard)
@Injectable()
export class PostService {
  constructor(private prisma: PrismaService){}
  
  async create(createPostDto: CreatePostDto & {userId: number}) {
    return await this.prisma.post.create({data: createPostDto})
  }
  async findAllByUser(id: number){
    return await this.prisma.post.findMany(
      {
        where: {userId: id},
        select: {
          id: true,
          title: true,
          description: true,
          user: {
            select: { name: true}
          }
        }
      })
  }

  async findAll() {
    return await this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        user: {
          select: {
            name: true
          }
        },
        Comment: {
          select: {
            text: true,
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
  }

  async findOne(id: number) {
    return await this.prisma.post.findUnique({where: {id}, })
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try{
      return await this.prisma.post.update({
        data:updatePostDto,
        where: {id}
      })
    }catch{
      throw new BadRequestException()
    }
  }

  async remove(id: number) {
    try{
      return await this.prisma.post.delete({where: {id}})
    }catch{
      throw new BadRequestException();
    }
  }
}
