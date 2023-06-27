import { Socket } from 'socket.io';
import { Game } from './game';

export class Room 
{
	player1 : Socket;
	player2 : Socket;
	game : Game;
	gameOpposant : Game;
	winner : Socket;
	isPlaying : boolean;

	constructor()
	{
	  this.player1 = null;
	  this.player2 = null;
	  this.game = null;
	  this.gameOpposant = null;
	  this.winner = null;
	  this.isPlaying = false;
	//   this.isGameOver = false;
	//   this.isGameWon = false;
	}
}