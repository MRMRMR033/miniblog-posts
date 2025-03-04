import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { User } from './entities/user.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {

  private readonly saltRound = 10

  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {

      const hashedPassword = await bcrypt.hash(createUserDto.password, this.saltRound)
      const existingUser = await this.prisma.user.findUnique({where: {email: createUserDto.email}})

      if(existingUser){
        throw new ConflictException(`el correo ${createUserDto.email} ya esta en uso.`)
      }
      
      return this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword
        }
      });

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(`El correo ${createUserDto.email} ya está en uso.`);
        }
      }
      console.error('Error en UserService.create:', error);
      throw new InternalServerErrorException('Ocurrió un error al crear el usuario.');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.prisma.user.findMany()
    } catch {
      console.log('error al obtener todos los usuarios.')
      throw new BadRequestException("Error al obtener todos los usuarios.")
    }
  }

  async findOneSignIn(email: string): Promise<User> {
    try {
      return this.prisma.user.findUnique({ where: { email } })
    }
    catch {
      console.log("Error al obtener este usuario.")
      throw new BadRequestException("Error al obtener este usuario.")
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return this.prisma.user.findUnique({ where: { id }, include: { posts: { select: { title: true } } } })
    } catch {
      console.log("Error al obtener este usuario.")
      throw new BadRequestException("Error al obtener este usuario.")
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.prisma.user.update({
        data: updateUserDto,
        where: { id }
      })
    } catch {
      throw new BadRequestException()
    }
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({where: {id}})
  }
}
