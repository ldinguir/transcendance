import { Socket } from 'socket.io';
import { Game } from './game';
export declare class Room {
    player1: Socket;
    player2: Socket;
    game: Game;
    gameOpposant: Game;
    winner: Socket;
    isPlaying: boolean;
    constructor();
}
