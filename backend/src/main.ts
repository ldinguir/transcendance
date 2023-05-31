import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Permet de créer une instance de l'application Nest

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
