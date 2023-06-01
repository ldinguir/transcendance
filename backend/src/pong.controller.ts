// Ce controller est responsable de la gestion des requetes HTTP entrantes.

import { Controller, Get, Render } from '@nestjs/common';

@Controller('pong')
export class PongController
{
  //@Get()
  // getGame(): string {
  //   return 'Ceci est le jeu';
  // }
  @Get()
  @Render('pong')
  playPong() {
    return {};
  }
}