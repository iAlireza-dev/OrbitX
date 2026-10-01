import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const swaggerConfig = new DocumentBuilder()
  .setTitle('OrbitX API')
  .setDescription(
    'Telecom backend for subscriptions, usage processing, allocation, billing, and authentication.',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, swaggerConfig);

SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
