import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';
import { Game } from './game';
import { Room } from './room';

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class GameSockets
{
	@WebSocketServer()
	server: Server;

	queueEasy:	Socket[] = [];
	queueMed:	Socket[] = [];
	queueHard:	Socket[] = [];
	queueRev:	Socket[] = [];

	rooms : Room[] = [];

	// Implémentation des méthodes de gestion des événements Socket.IO pour le jeu

	// les gens qui cliquent sur play et veulent lancer une partie 
	@SubscribeMessage('joinGame')
	handleJoinGame(client : Socket, mode: string)
	{
		console.log(`play request from : ${client.id}`);
		console.log(`Le mode est : ${mode}`);
		
		if (mode == ',easy')
		{
			console.log('on est entré dans easy !');
			this.queueEasy.push(client);
			if (this.queueEasy.length >= 2)
			{
				console.log(`player1 = ${this.queueEasy[0].id}`);
				console.log(`player2 = ${this.queueEasy[1].id}`);
				const room = new Room();
				room.player1 = this.queueEasy[0];
				room.player2 = this.queueEasy[1];

				// const room = [this.queueEasy[0], this.queueEasy[1]];
				this.queueEasy.splice(0,2);
				console.log(`Room = ${room}`);

				this.rooms.push(room);
				this.startGame(room);
			}
		}
		else if (mode == ',med')
		{
			this.queueMed.push(client);
			if (this.queueMed.length >= 2)
			{
				console.log(`player1 = ${this.queueMed[0].id}`);
				console.log(`player2 = ${this.queueMed[1].id}`);
				const room = new Room();
				room.player1 = this.queueMed[0];
				room.player2 = this.queueMed[1];

				// const room = [this.queueMed[0], this.queueMed[1]];
				this.queueMed.splice(0,2);

				this.rooms.push(room);
				this.startGame(room);
			}
		}
		else if (mode == ',hard')
		{
			this.queueHard.push(client);
			if (this.queueHard.length >= 2)
			{
				console.log(`player1 = ${this.queueHard[0].id}`);
				console.log(`player2 = ${this.queueHard[1].id}`);
				const room = new Room();
				room.player1 = this.queueHard[0];
				room.player2 = this.queueHard[1];

				// const room = [this.queueHard[0], this.queueHard[1]];
				this.queueHard.splice(0,2);

				this.rooms.push(room);
				this.startGame(room);
			}
		}
		else if (mode == ',rev')
		{
			this.queueRev.push(client);
			if (this.queueRev.length >= 2)
			{
				console.log(`player1 = ${this.queueRev[0].id}`);
				console.log(`player2 = ${this.queueRev[1].id}`);
				const room = new Room();
				room.player1 = this.queueRev[0];
				room.player2 = this.queueRev[1];

				// const room = [this.queueRev[0], this.queueRev[1]];
				this.queueRev.splice(0,2);

				this.rooms.push(room);
				this.startGame(room);
			}
		}
	}

	startGame(room : Room)
	{
		room.game = new Game();
		room.gameOpposant = new Game();

		console.log(`Le jeu va commencer entre ${room.player1.id} et ${room.player2.id}`);

		room.player1.emit('startGame');
		room.player2.emit('startGame');
		this.initGame(room.game, room.gameOpposant);

		const fct = setInterval(()=>
		{
			this.ballMove(room, fct);
		}, 50);
	}

	initGame(game : Game, gameOpposant : Game)
	{
	// Initialisation du joueur 1
		game.canvas = {
			height : 300,
			width : 600,
		}

		game.player = 
		{
			x : 0,
			y : 100,
			height : 100,
			width :10, 
		}

		game.player2 = 
		{
			x : 590,
			y : 100,
		}

		game.ball = 
		{
			x : 300,
			y : 150,
			r : 5,
			speed :
			{
				x : 2,
				y : 2,
			}
		}
// Initialisation du joueur 2
		gameOpposant.canvas = {
			height : 300,
			width : 600,
		}

		gameOpposant.player = 
		{
			x : 0,
			y : 100,
			height : 100,
			width :10, 
		}

		gameOpposant.player2 = 
		{
			x : 590,
			y : 100,
		}

		gameOpposant.ball = 
		{
			x : 300,
			y : 150,
			r : 5,
			speed :
			{
				x : -2,
				y : -2,
			}
		}
	}

	ballMove(room : Room, fct : any)
	{
		// Gestion des collision mur haut et bas avec la balle 
		if (room.game.ball.y < 0 || room.game.ball.y > room.game.canvas.height) // omis la taille de la balle
		{
			room.game.ball.speed.y *= -1;
			room.gameOpposant.ball.speed.y *= -1;
		}
		// Gestion des collisions avec le Paddle du joueur1
		if (room.game.ball.x < room.game.player.width)
		{
			if ((room.game.ball.y > room.game.player.y) && (room.game.ball.y < room.game.player.y + room.game.player.height))
			{
				room.game.ball.speed.x *= -1;
				room.gameOpposant.ball.speed.x *= -1;
			}
			else
			{
				// this.initGame(room.game, room.gameOpposant);
				room.player1.emit('gameOver', false);
				room.player2.emit('gameOver', true);
				// this.initGame(room.game, room.gameOpposant);
				var index = this.rooms.indexOf(room);
				if (index !== -1)
				{
				    this.rooms.splice(index, 1);
				}

				clearInterval(fct);
				console.log(`Il y a mtn ${this.rooms.length} rooms en cours`);
			}
		}
		// Gestion des collisions avec le paddle du joueur 2 
		if (room.game.ball.x > (room.game.canvas.width - room.game.player.width))
		{
			if ((room.game.ball.y > room.game.player2.y) && (room.game.ball.y < room.game.player2.y + room.game.player.height))
			{
				room.game.ball.speed.x *= -1;
				room.gameOpposant.ball.speed.x *= -1;
			}
			else
			{
				// this.initGame(room.game, room.gameOpposant);
				room.player1.emit('gameOver', true);
				room.player2.emit('gameOver', false);

				// this.initGame(room.game, room.gameOpposant);
				var index = this.rooms.indexOf(room);
				if (index !== -1)
				{
				    this.rooms.splice(index, 1);
				}
				
				clearInterval(fct);

				console.log(`Il y a mtn ${this.rooms.length} rooms en cours`);
			}
		}
		// On incremente ball.x et ball.y pour faire avancer la balle dans une direction
		room.game.ball.x += room.game.ball.speed.x;
		room.game.ball.y += room.game.ball.speed.y;
		room.gameOpposant.ball.x -= room.game.ball.speed.x;
		room.gameOpposant.ball.y -= room.game.ball.speed.y;

		// console.log(`ballX = ${this.game.ball.x}`);
		// console.log(`ballY = ${this.game.ball.y}`);
		room.player1.emit('ballmove', room.game);
		room.player2.emit('ballmove', room.gameOpposant);
	}

// /*
	@SubscribeMessage('playerMove')
	handlePlayerMove(client : Socket, playerPosY : number)
	{
		// const stop = 0;
		for(let i = 0; i < this.rooms.length; i++)
		{
			if (client.id == this.rooms[i].player1.id)
			{
				this.rooms[i].gameOpposant.player2.y = (this.rooms[i].gameOpposant.canvas.height - playerPosY) - this.rooms[i].gameOpposant.player.height;
				this.rooms[i].game.player.y = playerPosY;
				break;
			}
			else if (client.id == this.rooms[i].player2.id)
			{
				this.rooms[i].game.player2.y = (this.rooms[i].game.canvas.height - playerPosY) - this.rooms[i].game.player.height;
				this.rooms[i].gameOpposant.player.y = playerPosY;
				break;
			}
		}
	}
}
// */

