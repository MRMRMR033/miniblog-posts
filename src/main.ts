import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
//import { Prisma } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("mini blog")
    .setDescription("api open source para crear una app de blogs.")
    .setVersion("1.0")
    .addTag('posts')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
