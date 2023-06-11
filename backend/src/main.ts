import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// https://www.youtube.com/watch?v=fBtNgqIu63g
// La fonction bootstrap permet de créer une instance de l'application Nest

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  app.enableCors(corsOptions);

  // Permet de configurer le serveur pour servir des fichiers statiques
  // app.useStaticAssets(join(__dirname, '..', 'public'))
  // app.setBaseViewsDir(join(__dirname, '..', 'views'))
  // app.setViewEngine('hbs');

  // Permet de créer le server : En appelant la méthode listen de l'objet retourné par NestFactory.create() pour démarrer le server et obtenir un instance du server HTTP
  const server = await app.listen(3000);
}
bootstrap();
