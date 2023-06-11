import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class OnlineSockets
{
	@WebSocketServer()
	server: Server;

	users: string[] = [];
	// Implémentation des méthodes de gestion des événements Socket.IO 	afficher les id des clients en ligne

	// Connexion 
	handleConnection(client : Socket)
	{
		// console.log(`Client connected: ${client.id}`);
		const clientID = client.id;
		this.users.push(client.id);
		client.emit('clientInfo', clientID); // Donner a react son numero de client 
		this.sendOnlineUsers(this.users);
	}

	// Deconnection
	handleDisconnect(client : Socket)
	{
		// console.log(`Client disconnected: ${client.id}`);
		this.users = this.users.filter(item => item !== client.id); // Supprimer l'ID du client du tableau `users`
		this.sendOnlineUsers(this.users);
	}

	sendOnlineUsers(users: any[])
	{
		this.server.emit('onlineUsers', this.users);
	}
}