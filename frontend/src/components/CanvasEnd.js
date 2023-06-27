import { useEffect, useRef } from "react";

function CanvasEnd(props)
{
	const ref = useRef(null);
	// const socket = props.socket;

	useEffect(() => 
	{
		var canvas = ref.current;
		// console.log(canvas);
		var ctx = canvas.getContext("2d");

		// Taille du canvas
		canvas.width = 600;
		canvas.height = 300;

		function createConfetti()
		{
			// Coordonnées initiales aléatoires
			var x = Math.random() * canvas.width;
			var y = 0;
		
			// Vitesse et direction aléatoires
			var speed = 1 + Math.random() * 7;
			var angle = Math.random() * 2 * Math.PI;
		
			// Couleur aléatoire
			var color = '#' + Math.floor(Math.random() * 16777215).toString(16);
		
			// Créer l'objet confetti
			var confetti = {
				x: x,
				y: y,
				speed: speed,
				angle: angle,
				color: color,
				rotation: 0,
				rotationSpeed: Math.random() * 10
			};
		
			// Ajouter le confetti à la liste
			confettiList.push(confetti);
		}
		
		// Liste des confettis
		var confettiList = [];
		
		// Fonction d'animation
		function animateConfetti() {
			// Effacer le canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			// fond 
			const gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);
			gradient.addColorStop(0,'rgba(60, 221, 176, 1)');     // Départ
			gradient.addColorStop(0.4,'rgba(51, 163, 143, 1)'); // Intermédiaire
			gradient.addColorStop(1,'rgba(203, 99, 215, 1)');    // Arrivée
			ctx.fillStyle = gradient;            // Affectation au remplissage
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = 'white';
			ctx.font="40pt arial"
			if (props.isWon === true)
			{
				const textSize = ctx.measureText("You Win");
				ctx.fillText("You Win", (canvas.width / 2) - (textSize.width / 2), 70);
				// Générer de nouveaux confettis aléatoirement
				if (Math.random() < 0.2) {
					createConfetti();
			}
			}
			else
			{
				const textSize = ctx.measureText("You Lost");
				ctx.fillText("You Lost", (canvas.width / 2) - (textSize.width / 2), 70);
			}
		
			// Parcourir la liste des confettis
			for (var i = 0; i < confettiList.length; i++)
			{
				var confetti = confettiList[i];
		
				// Mettre à jour la position
				confetti.x += Math.cos(confetti.angle) * confetti.speed;
				confetti.y += Math.sin(confetti.angle) * confetti.speed + 0.5;
		
				// Faire tourner le confetti
				confetti.rotation += confetti.rotationSpeed;
		
				// Dessiner le confetti
				ctx.save();
				ctx.translate(confetti.x, confetti.y);
				ctx.rotate(confetti.rotation * Math.PI / 180);
				ctx.fillStyle = confetti.color;
				ctx.fillRect(-5, -5, 10, 10);
				ctx.restore();
		
				// Supprimer le confetti s'il est hors de l'écran
				if (confetti.y > canvas.height) {
					confettiList.splice(i, 1);
					i--;
				}
			}
		
			// Demander une nouvelle frame d'animation
			requestAnimationFrame(animateConfetti);
		}
		animateConfetti();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return(
	<canvas className='canvas' ref={ref}/>
	)
}
export default CanvasEnd;

