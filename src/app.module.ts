import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UserModule, AuthModule, PostModule, CommentModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
