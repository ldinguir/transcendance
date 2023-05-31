// https://blog.devoreve.com/2018/06/06/creer-un-pong-en-javascript/

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




































// ctx.beginPath();      // Début du chemin
// ctx.moveTo(50,50);    // Le tracé part du point 50,50
// ctx.lineTo(200,200);  // Un segment est ajouté vers 200,200
// ctx.moveTo(200,50);   // Puis on saute jusqu'à 200,50
// ctx.lineTo(50,200);   // Puis on trace jusqu'à 50,200
// ctx.closePath();      // Fermeture du chemin (facultative)
// ctx.stroke();

// ctx.beginPath();      // Début du chemin
// ctx.moveTo(100,50);    // Le tracé part du point 50,50
// ctx.lineTo(100,100);  // Un segment est ajouté vers 200,200  // Puis on saute jusqu'à 200,50
// ctx.lineTo(50,100);
// ctx.lineTo(50,50);  
// ctx.lineTo(100,50); // Puis on trace jusqu'à 50,200
// ctx.closePath();      // Fermeture du chemin (facultative)
// ctx.fill();

// // Voile du bateau
// ctx.beginPath();      // Début du chemin
// ctx.moveTo(150,80);   // Le tracé part du point 150,80
// ctx.lineTo(300,230);  // Un segment est ajouté vers 300,230
// ctx.lineTo(150,230);  // Un segment est ajouté vers 150,230
// ctx.closePath();      // Fermeture du chemin
// ctx.fillStyle = "lightblue"; // Définition de la couleur de remplissage
// ctx.fill();           // Remplissage du dernier chemin tracé

// // Coque du bâteau
// ctx.beginPath();      // Début d'un autre chemin
// ctx.moveTo(50,250);
// ctx.lineTo(100,300);
// ctx.lineTo(250,300);
// ctx.lineTo(300,250);
// ctx.fillStyle = "peru";
// ctx.strokeStyle = "sienna"; // Définition de la couleur de contour
// ctx.lineWidth = 5;         // Définition de la largeur de ligne
// ctx.fill();            // Application du remplissage
// ctx.stroke();          // Application du contour


// ctx.beginPath();
// ctx.moveTo(140,50);
// ctx.lineTo(140,250);
// ctx.lineWidth = 10;
// ctx.stroke();

// ctx.fillStyle = "olivedrab";
// ctx.fillRect(50,50,250,250);

// // Bouche
// ctx.fillStyle = "pink";
// ctx.fillRect(100,200,150,50);

// // Yeux
// ctx.fillStyle = "powderblue";
// ctx.fillRect(100,100,50,50);
// ctx.fillRect(200,100,50,50);


// ctx.lineWidth = 5;

// // Visage
// ctx.beginPath();
// ctx.arc(150,150,100,0,Math.PI*2,true);
// ctx.strokeStyle = "coral";
// ctx.fillStyle = "bisque";
// ctx.fill();
// ctx.stroke();

// // Bouche
// ctx.beginPath();
// ctx.arc(150,150,60,0,Math.PI,false);
// ctx.strokeStyle = "red";
// ctx.stroke();

// // Yeux
// ctx.beginPath();
// ctx.strokeStyle = "#369";
// ctx.fillStyle="#c00";
// ctx.arc(180,130,15,0,Math.PI*2,false);
// ctx.stroke();
// ctx.beginPath();
// ctx.arc(120,130,15,0,Math.PI*2,false); 
// ctx.stroke();


// ctx.beginPath();              
// ctx.lineWidth="3";
// ctx.strokeStyle="black"; 
// ctx.moveTo(50,50);
// ctx.bezierCurveTo(300,100,100,300,300,300);
// ctx.stroke();

// ctx.beginPath();            
// ctx.lineWidth="3";
// ctx.strokeStyle="black"; 
// ctx.moveTo(50,50);
// ctx.quadraticCurveTo(300,100,300,300);
// ctx.stroke(); 

// var gradient = ctx.createLinearGradient(50,50,250,250);
// gradient.addColorStop(0,"blue");     // Départ
// gradient.addColorStop(0.8,"yellow"); // Intermédiaire
// gradient.addColorStop(1,"green");    // Arrivée
// ctx.fillStyle = gradient;            // Affectation au remplissage
// ctx.fillRect(0,0,canvas.width,canvas.height);

// var gradient = ctx.createRadialGradient(0,0,50,0,150,250);
// gradient.addColorStop(0,"blue");     // Départ
// gradient.addColorStop(0.5,"yellow"); // Intermédiaire
// gradient.addColorStop(1,"green");    // Arrivée
// ctx.fillStyle = gradient;            // Affectation au remplissage
// ctx.fillRect(0,0,250,250);

// var image = new Image(); 
// image.src = 'image.jpg';
// image.onload = function() {
//   // Cette fonction est appelée lorsque l'image a été chargée
//   ctx.drawImage(this,50,50); // this fait référence à l'objet courant (=image)
// };

// var text = 'Hello kiwi!';
// ctx.font = "30pt Verdana";
// ctx.textAlign = "left";
// ctx.textBaseline = "top";
// var textPxLength = ctx.measureText(text);
// ctx.fillStyle = "darkgreen";
// ctx.fillText(text,25,50);
// ctx.fillStyle = "darkorange";
// ctx.fillText("width: "+Math.round(textPxLength.width)+"px",25,100);

// var text = 'Hello kiwi!';
// ctx.font = "30pt Verdana";
// ctx.textAlign = "left";
// ctx.textBaseline = "top";
// var textPxLength = ctx.measureText(text);
// ctx.strokeText(text,25,50);
// ctx.strokeText("width: "+Math.round(textPxLength.width)+"px",25,100);

// var text = "Hello kiwi!"; 
// ctx.font = "30pt Verdana";
// ctx.textAlign = "left"; 
// ctx.textBaseline = 'top';
// ctx.fillStyle = 'rgba(127,0,0,0.5)';
// ctx.fillText(text,50,50);

// ctx.fillStyle = 'rgba(252, 194, 0, 0.3)';
// ctx.fillRect(160,50,150,50);

// ctx.fillStyle = 'rgba(118, 174, 42, 0.4)';
// ctx.fillRect(280,80,50,50);


// ctx.globalAlpha = 0.5; // 50% opacité pour tous les tracés futurs
// ctx.fillRect(0,0,100,100);
// ctx.fillStyle = "blue";
// ctx.fillRect(50,50,100,100);
// ctx.fillStyle = "pink";
// ctx.fillRect(100,100,100,100);
// ctx.fillStyle = "green";
// ctx.fillRect(150,150,100,100);
// ctx.fillStyle = "gold";
// ctx.fillRect(200,200,100,100);
// ctx.fillStyle = "red";
// ctx.fillRect(250,250,100,100);

// ctx.font = "30pt Verdana";
// ctx.shadowOffsetX = 2;
// ctx.shadowOffsetY = 2;
// ctx.shadowBlur = 5;
// ctx.shadowColor = 'orange';
// ctx.fillStyle = 'olive';
// ctx.fillText("Hello Kiwi!", 40, 60);
// ctx.beginPath();
// ctx.strokeStyle = 'skyblue';
// ctx.shadowColor = 'grey';
// ctx.lineWidth = 10;
// ctx.arc(150,70,60,0,Math.PI,false);
// ctx.stroke();

// var img = new Image();
// img.src = "img/pepins.png";
// img.onload= function(){
// 	ctx.drawImage(img,150,15);
	// ctx.rotate(0.35);
	// ctx.drawImage(img,150,15);
	// ctx.rotate(0.35);
	// ctx.drawImage(img,150,15);
	// ctx.rotate(0.35);
	// ctx.drawImage(img,150,15);

// }