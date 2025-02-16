import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserPostGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.sub;  // El userId del token JWT
    const postId = request.params.id; // El ID del post que el usuario intenta acceder (si es que lo tiene)

    // Verificamos si el userId del token coincide con el del post
    if (userId === postId) {
      return true;  // Permitir acceso
    } else {
      throw new UnauthorizedException('No tienes permisos para acceder a este post');
    }
  }
}
