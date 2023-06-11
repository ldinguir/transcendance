import { Server, Socket } from 'socket.io';
export declare class OnlineSockets {
    server: Server;
    users: string[];
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    sendOnlineUsers(users: any[]): void;
}
