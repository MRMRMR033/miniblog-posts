import { Controller, Get, Post, Body, Patch, Param, Delete, ConflictException, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';


@ApiTags("Users")
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}
  
  @Public()
  @ApiResponse({ status: 201, description: "Usuario creado con éxito", type: User })
  @ApiResponse({ status: 409, description: "El correo electrónico ya está en uso." })
  @ApiResponse({ status: 500, description: "Ocurrio un error al procesar la solicitud." })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new HttpException( 
          { message: error.message, statusCode: HttpStatus.CONFLICT },
          HttpStatus.CONFLICT
        );
      }
      console.error("Error en userController.create", error)
      throw new HttpException(
        { message: "Ocurrió un error al procesar la solicitud.", statusCode: HttpStatus.INTERNAL_SERVER_ERROR },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @ApiBearerAuth()
  @ApiResponse({status: 200, description: "Lista de usuarios.", type: [User]})
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @ApiBearerAuth()
  @ApiResponse({status: 200, description: "informacion del usuario.", type: User})
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | undefined> {
    return await this.userService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiResponse({status: 200, description: "Actualizacion de los datos del usuario.", type: User})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User | undefined> {
    return await this.userService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiResponse({status: 200, description: "Eliminar usuario.", type: User})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
