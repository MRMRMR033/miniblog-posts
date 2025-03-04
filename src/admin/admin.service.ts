import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}
  async create(createAdminDto: CreateAdminDto) {
    try{
      const hashedPassword = await bcrypt.hash(createAdminDto.password, 10)
      return await this.prismaService.user.create({data: {
        name: createAdminDto.name,
        email: createAdminDto.email,
        password: hashedPassword,
        role: createAdminDto.role
      }});
    }
    catch{
      console.log('error al crear el admin')
      throw new Error('Error al crear el admin')
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prismaService.user.findMany({where: {role: "ADMIN"}})
    } catch (error) {
      console.log('error al obtener todos los admin')
      throw new Error('Error al obtener todos los admin')
    }
  
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.user.findUnique({where: {id}})
    } catch (error) {
      console.log('error al obtener el admin')
      throw new Error('Error al obtener el admin')
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      return await this.prismaService.user.update({where: {id}, data: updateAdminDto})
    } catch (error) {
      console.log('error al actualizar el admin')
      throw new Error('Error al actualizar el admin')
    }
  }
}
