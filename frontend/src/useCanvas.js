
import { useRef, useEffect } from 'react';

const useCanvas = (gameZone, ballMove) => 
{
	// Creer une référence sur l'element canvas
	const canvasRef = useRef(null);

	useEffect(() =>
	{
		const canvas = canvasRef.current;
		const cxt = canvas.getContext('2d');
		canvas.width = "640";
		canvas.height = "480";

		
		// Taille des paddle
		const playerHeight = 100;
		const playerWidth =10;
		let game;
		let animationFrameId;

		// Objet Game
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

		function play()
		{
			ballMove(canvas, game);
			gameZone(canvas, cxt, game);
		
			animationFrameId = window.requestAnimationFrame(play);
		}

		gameZone(canvas, cxt, game);
		play();
    
		return () =>{window.cancelAnimationFrame(animationFrameId);}
	}, [gameZone, ballMove]);

	return canvasRef;

}

export default useCanvas;