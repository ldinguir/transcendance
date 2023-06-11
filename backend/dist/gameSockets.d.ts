import { Server, Socket } from 'socket.io';
import { Game } from './game';
export declare class GameSockets {
    server: Server;
    queueEasy: Socket[];
    queueMed: Socket[];
    queueHard: Socket[];
    queueRev: Socket[];
    rooms: any[];
    game: Game;
    constructor();
    handleJoinGame(client: Socket, mode: string): void;
    startGame(room: any[]): void;
    initGame(): void;
    ballMove(room: any[]): void;
}
