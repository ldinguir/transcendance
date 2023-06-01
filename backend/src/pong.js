var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var game;

// Taille des paddle
const playerHeight = 100;
const playerWidth =10;


game = 
{
	player :
	{
		x : 0,
		y : (canvas.height / 2) - (playerHeight / 2)
	},
	// computer :
	// {
		// y : (canvas.height / 2) - (playerHeight / 2)
// 
	// },
	ball :
	{
		x : canvas.width / 2,
		y : canvas.height / 2,
		r : 5,
		speed : 
		{
			x : 4,
			y : 4
		}
	}
 }

// Initialisation de l'objet Game 
function initGame()
{
	game.player.y = (canvas.height / 2) - (playerHeight / 2);
	game.ball.x = canvas.width / 2;
	game.ball.y = canvas.width / 2;
	game.ball.speed.x = 2;
	game.ball.speed.y = 2;
}

function gameZone() 
{
	// fond
	// ctx.fillStyle = 'black';
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

function ballMove()
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
			initGame();
		}
	}
	// On incremente ball.x et ball.y pour faire avancer la balle dans une direction
	game.ball.x += game.ball.speed.x;
	game.ball.y += game.ball.speed.y;
}

function play()
{
	ballMove();
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
		game.player.y = 0;
	}
	else if (mouseLocation > (canvas.height - (playerHeight / 2))) // Cas collision mur du bas
	{
		game.player.y = canvas.height - playerHeight;
	}
	else
	{
		game.player.y = mouseLocation - (playerHeight / 2);
	}
}

// Lorsque la souris passe par le canvas, on récupère l'évènement
canvas.addEventListener('mousemove', playerMove);

// ---------- FIN DÉPLACEMENTS DES JOUEURS ET GÉSTION DES COLLISIONS ---------- //



gameZone();
play();

