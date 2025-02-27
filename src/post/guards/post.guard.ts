import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserPostGuard implements CanActivate {
  constructor(private prismaService: PrismaService){}
  
  async canActivate(context: ExecutionContext,): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const userId = request.user.sub;  // El userId del token JWT
    const postId = request.params.id; // El ID del post que el usuario intenta acceder (si es que lo tiene)

    try{

      const post = await this.prismaService.post.findUnique({where: {id: postId}, select: {userId: true}});
      if(!post){
        throw new UnauthorizedException('Post no encontrado.')
      }

      if(userId === post.userId){
        return true
      }else{
        throw new UnauthorizedException('No tienes permiso para acceder a este post.')
      }
      
    }catch(error){
      console.error('Error en userPostGuard.', error)
      throw new UnauthorizedException('Error al verificar los permisos.')

    }
  }
}
