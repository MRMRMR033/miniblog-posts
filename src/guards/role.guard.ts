import { CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstant } from "src/auth/auth.constants";
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService: JwtService){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if(!token){
            throw new UnauthorizedException();
        }
        try{
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstant.secret
                }
            );
            request['user'] = payload;
        }catch{
            throw new UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request: Request): string | undefined{
        const authHeader = request.headers.authorization
        if(!authHeader){
            return undefined;
        }
        const [type, token] = authHeader.split(' ');
        return type == 'Bearer' ? token : undefined;
    }

}