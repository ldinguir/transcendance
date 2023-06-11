import { Injectable } from '@nestjs/common';
import { Game } from './game';

@Injectable()
export class GameService {
	private game: Game;
	private intervalId: NodeJS.Timeout;

  	constructor()
	{
    	this.game = new Game();
    	this.intervalId = null;
  	}

	initGame()
	{
    	this.game.gameZone = { width: 800, height: 400 };
    	this.game.ballPosition = { x: 0, y: 0 };
    	this.game.playerPosition = { x: 0, y: 0 };
    	this.game.score = 0;
    	this.game.isPlaying = false;
    	this.game.isGameOver = false;
    	this.game.isGameWon = false;
    	// Autres initialisations...

    	// Retourner l'état initial du jeu
    	return this.game;
	}

	getGameZone()
	{
		return this.game.gameZone;
  	}

	ballMove()
	{
    	// Logique de déplacement de la balle
    	this.game.ballPosition.x += 1; // Déplacement horizontal
    	this.game.ballPosition.y += 1; // Déplacement vertical

    	// Vérifier les collisions avec les bords de la zone de jeu
    	if (this.game.ballPosition.x >= this.game.gameZone.width)
		{
    		// Gérer la collision avec le bord droit
    		// Réinitialiser la position de la balle
    		this.game.ballPosition.x = 0;
    		this.game.ballPosition.y = 0;
    		// Incrémenter le score
    		this.game.score += 1;
    	}

    	if (this.game.ballPosition.y >= this.game.gameZone.height)
		{
    		// Gérer la collision avec le bord inférieur
    		// Réinitialiser la position de la balle
    		this.game.ballPosition.x = 0;
    		this.game.ballPosition.y = 0;
    		// Définir le jeu comme terminé
    		this.game.isGameOver = true;
    	}

    // Autres vérifications de collision...

    // Émettre les nouvelles coordonnées de la balle à tous les clients connectés
    // Vous devez implémenter la logique d'émission ici
	}

	play()
	{
		this.initGame(); // Réinitialiser le jeu
		this.game.isPlaying = true;
		this.game.isGameOver = false;
		this.game.isGameWon = false;

    	// Lancer le jeu (appeler ballMove() périodiquement par exemple)
    	this.intervalId = setInterval(() => 
		{
    		this.ballMove();
    	}, 1000); // Appeler ballMove() toutes les 1000 ms (1 seconde)
	}

	playerMove(position: number)
	{
		// Mettre à jour la position du joueur en fonction de la position fournie
		this.game.playerPosition.x = position;

    // Émettre la nouvelle position du joueur à tous les clients connectés
    // Vous devez implémenter la logique d'émission ici
	}

	stopGame()
	{
		// Arrêter le jeu en arrêtant l'appel périodique à ballMove()
		clearInterval(this.intervalId);
	}
}