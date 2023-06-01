import React from 'react';
import Canvas from './Canvas';

function App()
{
	// Taille des paddle
	const playerHeight = 100;
	const playerWidth = 10;
  const gameZone = (canvas, ctx, game) => 
  {
    // fond
    const gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
    gradient.addColorStop(0,'rgba(60, 221, 176, 1)');     // Départ
    gradient.addColorStop(0.4,'rgba(51, 163, 143, 1)'); // Intermédiaire
    gradient.addColorStop(1,'rgba(203, 99, 215, 1)');    // Arrivée
    ctx.fillStyle = gradient;            // Affectation au remplissage
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // ligne milieu
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2 , canvas.height);
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.closePath();
  
    // Les paddles des joueurs 
    ctx.fillStyle = 'white';
    ctx.fillRect(game.player.x, game.player.y, playerWidth, playerHeight);
    ctx.fillRect((canvas.width - playerWidth), game.player.y, playerWidth, playerHeight);
  
    // La balle
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(game.ball.x, game.ball.y, game.ball.r, 0, (2 * Math.PI));
    ctx.fill();
    ctx.closePath();
  }

  // Initialisation de l'objet Game 
  function initGame(canvas, game)
  {
    game.player.y = (canvas.height / 2) - (playerHeight / 2);
    game.ball.x = canvas.width / 2;
    game.ball.y = canvas.width / 2;
    game.ball.speed.x = 2;
    game.ball.speed.y = 2;
  }

  const ballMove = (canvas, game) =>
  {
	  // Gestion des collision mur haut et bas avec la balle 
	  if (game.ball.y < 0 || game.ball.y > canvas.height) // omis la taille de la balle
	  {
	  	game.ball.speed.y *= -1;
	  }
	  // Gestion des collisions avec le Paddle du joueur
	  if (game.ball.x < playerWidth || game.ball.x > (canvas.width - playerWidth))
	  {
	  	if ((game.ball.y > game.player.y) && (game.ball.y < game.player.y + playerHeight))
	  	{
	  		game.ball.speed.x *= -1;
	  	}
	  	else
	  	{
	  		initGame(canvas, game);
	  	}
	  }
	  // On incremente ball.x et ball.y pour faire avancer la balle dans une direction
	  game.ball.x += game.ball.speed.x;
	  game.ball.y += game.ball.speed.y;
}

  return (<Canvas gameZone={gameZone} ballMove={ballMove}/>);
}

export default App;
