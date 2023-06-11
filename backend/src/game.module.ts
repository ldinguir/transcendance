import { Module } from "@nestjs/common";
import { GameSockets } from "./gameSockets";

@Module({
	providers: [GameSockets]
})
export class gameModule {}