import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async signIn(email: string, pass: string): Promise<any>{

        const user = await this.userService.findOneSignIn(email);
        
        if(!user){
            throw new UnauthorizedException();
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        if(!isMatch){
            throw new UnauthorizedException('Contrasena incorrecta');
        }

        const payload = { sub: user.id, username: user.email }
        
        return {
            access_token:   await this.jwtService.signAsync(payload)
        }
    }
}
