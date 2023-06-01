import { Server, Socket } from 'socket.io';
export declare class GameGateway {
    server: Server;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handlePlayerMovement(): void;
}
