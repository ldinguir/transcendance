// Ce controller est responsable de la gestion des requetes HTTP entrantes.

import { Controller, Get } from '@nestjs/common';

@Controller('game')
export class GameController
{
  @Get()
  getGame(): string {
    return 'Ceci est le jeu';
  }
}