import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { onlineModule } from './online.module';
import { gameModule } from './game.module';

@Module({
  imports: [onlineModule, gameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
