import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server, Socket} from 'socket.io';
import { Game } from './game';
// import { GameService } from './game.service';

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

	rooms : any[] = [];

	game : Game;

	constructor()
	{
		this.game = new Game(); // Ajout de l'initialisation de this.game
	}

	// private gameService: GameService;

	// constructor(gameService: GameService)
	// {
		// this.gameService = gameService;
	// }

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
				console.log(`player1 = ${this.queueEasy[0]}`);
				console.log(`player2 = ${this.queueEasy[1]}`);
				const room = [this.queueEasy[0], this.queueEasy[1]];
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
				console.log(`player1 = ${this.queueMed[0]}`);
				console.log(`player2 = ${this.queueMed[1]}`);
				const room = [this.queueMed[0], this.queueMed[1]];
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
				console.log(`player1 = ${this.queueHard[0]}`);
				console.log(`player2 = ${this.queueHard[1]}`);
				const room = [this.queueHard[0], this.queueHard[1]];
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
				console.log(`player1 = ${this.queueRev[0]}`);
				console.log(`player2 = ${this.queueRev[1]}`);
				const room = [this.queueRev[0], this.queueRev[1]];
				this.queueRev.splice(0,2);

				this.rooms.push(room);
				this.startGame(room);
			}
		}
	}

	startGame(room : any[])
	{
		console.log(`Le jeu va commencer entre ${room[0].id} et ${room[1].id}`);
		room.forEach((player) => {player.emit('startGame');});
		this.initGame();
		setInterval(()=>
		{
			this.ballMove(room);
		}, 50);
	}

	initGame()
	{
		this.game.canvas = {
			height : 300,
			width : 600,
		}

		this.game.player = 
		{
			x : 0,
			y : 100,
			height : 100,
			width :10, 
		}

		this.game.player2 = 
		{
			x : 590,
			y : 100,
		}

		this.game.ball = 
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
	}

	ballMove(room : any[])
	{
		// Gestion des collision mur haut et bas avec la balle 
		if (this.game.ball.y < 0 || this.game.ball.y > this.game.canvas.height) // omis la taille de la balle
		{
			this.game.ball.speed.y *= -1;
		}
		// Gestion des collisions avec le Paddle du joueur1
		if (this.game.ball.x < this.game.player.width)
		{
			if ((this.game.ball.y > this.game.player.y) && (this.game.ball.y < this.game.player.y + this.game.player.height))
			{
				this.game.ball.speed.x *= -1;
			}
			else
			{
				this.initGame();
			}
		}
		// Gestion des collisions avec le paddle du jpueur 2 
		if (this.game.ball.x > (this.game.canvas.width - this.game.player.width))
		{
			if ((this.game.ball.y > this.game.player2.y) && (this.game.ball.y < this.game.player2.y + this.game.player.height))
			{
				this.game.ball.speed.x *= -1;
			}
			else
			{
				this.initGame();
			}
		}
		// On incremente ball.x et ball.y pour faire avancer la balle dans une direction
		this.game.ball.x += this.game.ball.speed.x;
		this.game.ball.y += this.game.ball.speed.y;
		console.log(`ballX = ${this.game.ball.x}`);
		console.log(`ballY = ${this.game.ball.y}`);
		room.forEach((player) => {player.emit('ballmove', this.game);});
	}

/*
	@SubscribeMessage('playerMove')
	handlePlayerMove(client : Socket, playerPosY : number)
	{
		const stop = 0;
		for(let i = 0; i < this.rooms.length; i++)
		{
			for(let j = 0; j < 2; j++)
			{
				if (client.id == (this.rooms[i][j]).id)
				{
					if (j == 0)
					{
						this.rooms[i][0].emit('playermove2', playerPosY);
					}
					else
					{
						this.rooms[i][1].emit('playermove2', playerPosY);
					}
					break;
				}
			}
			if (stop)
			{
				break;
			}
		}



		// let targetPlayer: Socket | null = null;
		// let targetOpponent: Socket | null = null;
	//   
		// for (let i = 0; i < this.rooms.length; i++) {
		//   for (let j = 0; j < 2; j++) {
			// if (client.id === this.rooms[i][j].id) {
			//   targetPlayer = this.rooms[i][j];
			//   targetOpponent = this.rooms[i][(j + 1) % 2]; // Récupère l'opposant du joueur
	//   
			//   break;
			// }
		//   }
	//   
		//   if (targetPlayer && targetOpponent) {
			// break;
		//   }
		// }
	//   
		// if (targetPlayer && targetOpponent) {
		//   targetOpponent.emit('playermove2', playerPosY); // Envoie le mouvement du joueur 1 à l'opposant (joueur 2)
		// }



		// let targetRoom: Socket[] | undefined;
// 
		// for (let i = 0; i < this.rooms.length; i++) {
		//   if (this.rooms[i].includes(client)) {
			// targetRoom = this.rooms[i];
			// break;
		//   }
		// }
	//   
		// if (targetRoom && targetRoom.length === 2) {
		//   const targetPlayer = targetRoom.find((player) => player !== client);
		//   if (targetPlayer) {
			// targetPlayer.emit('playermove2', playerPosY); // Envoie le mouvement du joueur 1 à l'opposant (joueur 2)
		//   }
		// }




		// const room = this.rooms.find((room) => room.includes(client));
		// if (room && room.length === 2) {
		//   const targetPlayer = room.find((player) => player !== client);
		//   if (targetPlayer) {
			// targetPlayer.emit('playerMove', playerPosY);
		//   }
		// }
	}
	*/
}
