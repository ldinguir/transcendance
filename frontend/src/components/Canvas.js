import { useEffect, useRef } from "react";
import '../styles/Canvas.css';

function Canvas(props)
{
	// Ca sert a quoi useRef
	const ref = useRef(null);
	const game = props.updatedGame;

	// Pourquoi useEffect
	useEffect(() => {
		const socket = props.socket;
/*
		socket.on('playermove2', (pos) => {
			setPlaye2PosY(pos);
		});
*/
		var canvas = ref.current; // pourquoi ref.current au lieu de document.getElementById("canvas")
		var ctx = canvas.getContext("2d");

		// Taille du canvas
		canvas.width = 600;
		canvas.height = 300;

		// Taille des paddle
		const playerHeight = props.playerHeight;
		const playerWidth = props.playerWidth;
		// const speed = props.speed;
		const reverse = props.reverse;

		function gameZone() 
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
			ctx.fillRect(game.player2.x, game.player2.y, playerWidth, playerHeight);
			// ctx.fillRect(game.player2.x, Player2PosY, playerWidth, playerHeight);

			// La balle
			ctx.beginPath();
			ctx.fillStyle = 'white';
			ctx.arc(game.ball.x, game.ball.y, game.ball.r, 0, (2 * Math.PI));
			ctx.fill();
			ctx.closePath();
		}

		function play() // Fonction qui met a jour la positions des joueurs, la position de la balle
		{
			// ballMove();
			gameZone();
			requestAnimationFrame(play);
		}

		// ---------- DÉPLACEMENTS DES JOUEURS ET GÉSTION DES COLLISIONS ---------- // 
		function playerMove(event) 
		{
			// Recupere la position du canvas par rapport à la page du navigateur 
			let canvasLocation = canvas.getBoundingClientRect();
		
			// Calcul de la position de la souris par rapport a la fenetre et non pas la page du navigateur
			let mouseLocation = event.clientY - canvasLocation.y;
		
			// Recalcul de la position du Paddle --> Le deplacer verticalement de telle sorte que son centre soit à la hauteur de la souris
			if (mouseLocation < (playerHeight / 2)) // Collision du mur d'en haut
			{
				if(reverse)
				{
					game.player.y = (canvas.height - playerHeight);
				}
				else
				{
					game.player.y = 0;
				}
			}
			else if (mouseLocation > (canvas.height - (playerHeight / 2))) // Cas collision mur du bas
			{
				if (reverse)
				{
					game.player.y = 0;
				}
				else
				{
					game.player.y = canvas.height - playerHeight;
				}
			}
			else
			{
				if (reverse)
				{
					game.player.y = canvas.height - mouseLocation - (playerHeight / 2);
				}
				else
				{
					game.player.y = (mouseLocation - (playerHeight / 2));
				}
			}
			socket.emit('playerMove', game.player.y);
		}
		
		// Lorsque la souris passe par le canvas, on récupère l'évènement
		canvas.addEventListener('mousemove', playerMove);
		 // /*
		gameZone();
		play();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [game]);
	
	return(
	<canvas className='canvas' ref={ref}/>
	)
}
export default Canvas;








// ---------- BACKUP ---------- //

		/*
		function ballMove()
		{
			// Gestion des collision mur haut et bas avec la balle 
			if (game.ball.y < 0 || game.ball.y > canvas.height) // omis la taille de la balle
			{
				game.ball.speed.y *= -1;
			}
			// Gestion des collisions avec le Paddle du joueur1
			if (game.ball.x < playerWidth)
			{
				if ((game.ball.y > game.player.y) && (game.ball.y < game.player.y + playerHeight))
				{
					game.ball.speed.x *= -1;
				}
				else
				{
					initGame();
				}
			}
			// Gestion des collisions avec le paddle du jpueur 2 
			if (game.ball.x > (canvas.width - playerWidth))
			{
				if ((game.ball.y > game.player2.y) && (game.ball.y < game.player2.y + playerHeight))
				{
					game.ball.speed.x *= -1;
				}
				else
				{
					initGame();
				}
			}
			// On incremente ball.x et ball.y pour faire avancer la balle dans une direction
			game.ball.x += game.ball.speed.x;
			game.ball.y += game.ball.speed.y;
		}
*/


 /*

		// ---------- DÉPLACEMENTS DES JOUEURS ET GÉSTION DES COLLISIONS ---------- // 
		function playerMove(event) 
		{
			// Recupere la position du canvas par rapport à la page du navigateur 
			let canvasLocation = canvas.getBoundingClientRect();
		
			// Calcul de la position de la souris par rapport a la fenetre et non pas la page du navigateur
			let mouseLocation = event.clientY - canvasLocation.y;
		
			// Recalcul de la position du Paddle --> Le deplacer verticalement de telle sorte que son centre soit à la hauteur de la souris
			if (mouseLocation < (playerHeight / 2)) // Collision du mur d'en haut
			{
				if(reverse)
				{
					game.player.y = (canvas.height - playerHeight);
				}
				else
				{
					game.player.y = 0;
				}
			}
			else if (mouseLocation > (canvas.height - (playerHeight / 2))) // Cas collision mur du bas
			{
				if (reverse)
				{
					game.player.y = 0;
				}
				else
				{
					game.player.y = canvas.height - playerHeight;
				}
			}
			else
			{
				if (reverse)
				{
					game.player.y = canvas.height - mouseLocation - (playerHeight / 2);
				}
				else
				{
					game.player.y = (mouseLocation - (playerHeight / 2));
				}
			}
			// socket.emit('playerMove', clientId, game.player.y);
			// socket.emit('playerMove', game.player.y);
			// socket.emit('playerMove', game.player.y);
		}

		// Lorsque la souris passe par le canvas, on récupère l'évènement
		canvas.addEventListener('mousemove', playerMove);
 // /*
		function player2Move(event) 
		{
			// Recupere la position du canvas par rapport à la page du navigateur 
			let canvasLocation = canvas.getBoundingClientRect();
		
			// Calcul de la position de la souris par rapport a la fenetre et non pas la page du navigateur
			let mouseLocation = event.clientY - canvasLocation.y;
		
			// Recalcul de la position du Paddle --> Le deplacer verticalement de telle sorte que son centre soit à la hauteur de la souris
			if (mouseLocation < (playerHeight / 2)) // Collision du mur d'en haut
			{
				if(reverse)
				{
					game.player2.y = (canvas.height - playerHeight);
				}
				else
				{
					game.player2.y = 0;
				}
			}
			else if (mouseLocation > (canvas.height - (playerHeight / 2))) // Cas collision mur du bas
			{
				if (reverse)
				{
					game.player2.y = 0;
				}
				else
				{
					game.player2.y = canvas.height - playerHeight;
				}
			}
			else
			{
				if (reverse)
				{
					game.player2.y = canvas.height - mouseLocation - (playerHeight / 2);
				}
				else
				{
					game.player2.y = mouseLocation - (playerHeight / 2);
				}
			}
		}

		// Lorsque la souris passe par le canvas, on récupère l'évènement
		canvas.addEventListener('mousemove', player2Move);


	// */	