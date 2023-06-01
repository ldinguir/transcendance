import { WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';

@WebSocketGateway()
export class GameGateway 
{
	server: Server;

	// Implémentation des méthodes de gestion des événements Socket.IO pour le jeu

	// Connexion 
	handleConnection(client : Socket)
	{
		console.log(`Client connected: $(client.id)`);
	}

	// Deconnection
	handleDisconnect(client : Socket)
	{
		console.log(`Client disconnected: $(client.id)`);
	}

	// Mouvement du joueur 
	// Le decorateur SubscribeMessage indique a Nest.js que la methode est associée à un evenement socket.IO spécifique
	// CAD que la méthode sera appelée à chaque fois que le client enverra un message avec l'évènement 'playerMovement'
	@WebSocketServer()
	handlePlayerMovement()
	{
		// recuperer mouvement du joueur 
	}

	// les méthodes 'handleConnection' et 'handleDisconnect' n'ont pas besoin de decorateurs car ce sont des méthodes speciales qui correspondent aux évènements de connection et deconnection des clients et Nest.js les detecte automatiquement et les execute lorsque les évènements de connection et de deconnection se produisent. 

}