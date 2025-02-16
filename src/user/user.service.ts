import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {

  private readonly saltRound = 10

  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    try {

      const hashedPassword = await bcrypt.hash(createUserDto.password, this.saltRound)

      return this.prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword
        }
      });

    } catch {
      console.log("Error al crear el usuario")
      throw new BadRequestException("Usuario no encontrado")
    }
  }

  async findAll() {
    try {
      return this.prisma.user.findMany()
    } catch {
      console.log('error al obtener todos los usuarios.')
      throw new BadRequestException("Error al obtener todos los usuarios.")
    }
  }

  async findOneSignIn(email: string) {
    try {
      return this.prisma.user.findUnique({ where: { email } })
    }
    catch {
      console.log("Error al obtener este usuario.")
      throw new BadRequestException("Error al obtener este usuario.")
    }
  }

  async findOne(id: number) {
    try {
      return this.prisma.user.findUnique({ where: { id }, include: { posts: { select: { title: true } } } })
    } catch {
      console.log("Error al obtener este usuario.")
      throw new BadRequestException("Error al obtener este usuario.")
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        data: updateUserDto,
        where: { id }
      })
    } catch {
      throw new BadRequestException()
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
