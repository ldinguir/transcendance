import { Server, Socket } from 'socket.io';
import { Game } from './game';
import { Room } from './room';
export declare class GameSockets {
    server: Server;
    queueEasy: Socket[];
    queueMed: Socket[];
    queueHard: Socket[];
    queueRev: Socket[];
    rooms: Room[];
    handleJoinGame(client: Socket, mode: string): void;
    startGame(room: Room): void;
    initGame(game: Game, gameOpposant: Game): void;
    ballMove(room: Room, fct: any): void;
    handlePlayerMove(client: Socket, playerPosY: number): void;
}
