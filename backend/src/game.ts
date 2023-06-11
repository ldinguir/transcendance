
export class Game 
{
	canvas :
	{
		height	: number,
		width	: number
	};
	player :
	{
		x		: number,
		y		: number,
		height	: number,
		width	: number
	};
	player2 :
	{
		x		: number,
		y		: number

	};
	ball :
	{
		x		: number,
		y		: number,
		r		: number,
		speed	: 
		{
			x	: number,
			y	: number
		}
	}
}

/*
export class Game 
{
	gameZone: { width: number; height: number };
	ballPosition: { x: number; y: number };
	playerPosition: { x: number; y: number };
	score: number;
	isPlaying: boolean;
	isGameOver: boolean;
	isGameWon: boolean;
  
	constructor()
	{
	  this.gameZone = { width: 0, height: 0 };
	  this.ballPosition = { x: 0, y: 0 };
	  this.playerPosition = { x: 0, y: 0 };
	  this.score = 0;
	  this.isPlaying = false;
	  this.isGameOver = false;
	  this.isGameWon = false;
	}
}
*/