import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';


@ApiTags("Users")
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}
  
  @Public()
  @ApiResponse({status: 201, description: "creacion del usario", type: User})
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Public()
  @ApiResponse({status: 200, description: "Lista de usuarios.", type: [User]})
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiResponse({status: 200, description: "informacion del usuario.", type: User})
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | undefined> {
    return await this.userService.findOne(+id);
  }

  @ApiResponse({status: 200, description: "Actualizacion de los datos del usuario.", type: User})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | undefined> {
    return await this.userService.update(+id, updateUserDto);
  }

  @ApiResponse({status: 200, description: "Eliminar usuario.", type: User})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
