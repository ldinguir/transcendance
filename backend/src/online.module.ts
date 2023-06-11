import { Module } from "@nestjs/common";
import { OnlineSockets } from "./onlineSockets";

@Module({
	providers: [OnlineSockets]
})
export class onlineModule {}