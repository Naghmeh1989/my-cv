import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require ('cookie-session');
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({keys:['ABC']}));
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
  }));
  const config = new DocumentBuilder()
  .setTitle('Mycv API')
  .setDescription('The Mycv API description')
  .setVersion('1.0.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  console.log('Swagger is running on: http://localhost:3000/api');
}
bootstrap();
