import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './auth.constants';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
@Module({
  controllers: [AuthController],
  providers: [AuthService, {provide: APP_GUARD, useClass: AuthGuard}],
  imports: [UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstant.secret,
      signOptions: { expiresIn: "1h"}
    })
  ],
  exports: [AuthService]
})
export class AuthModule {}
