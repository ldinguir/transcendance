import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Canvas from "./Canvas";
import '../styles/Canvas.css';

function CanvasQueue(props)
{
	const ref = useRef(null);
	const [clientId, setClientId] = useState('');
	const [GameStarted, setGameStarted] = useState(false);
	// const [newGame, setNewGame] = useState([300, 150]);
	//  /*
	const [newGame, setNewGame] = useState(
		{
			canvas : 
			{
				height : 30,
				width : 600,
			},
			player : 
			{
				x : 0,
				y : 100,
				height : 100,
				width :10, 
			},
			player2 : 
			{
				x : 590,
				y : 100,
			},
			ball : 
			{
				x : 300,
				y : 150,
				r : 5,
				speed :
				{
					x : 2,
					y : 2,
				},
			}
		});
		// */

	useEffect(() => {	
		const socket = io('http://localhost:3000');

		socket.on('clientInfo', (id) => {
			setClientId(id); // Stocke l'ID du client dans clientID
		});

		socket.emit('joinGame', clientId, props.mode);

		socket.on('startGame', () => {setGameStarted(true)});

		socket.on('ballmove', (updatedGame) => {
			// console.log(updatedGame);
			setNewGame(updatedGame);
			});
			// console.log(`ballX = ${game.ball.x}`);
			// console.log(`ballY = ${game.ball.y}`);
			// console.log(`NewballX = ${newBallPos[0]}`);
			// console.log(`NewballY = ${newBallPos[1]}`);
		
		var canvas = ref.current;
		var ctx = canvas.getContext("2d");

		// Taille du canvas
		canvas.width = 600;
		canvas.height = 300;
		
		var smallCirlce = {
			radius: 30,
			center: {
				x: (canvas.width / 2) - 15,
				y: 150
			},
			speed: 2
		}
		
		var progress = 0;
		
		function loading() {
		
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = 'white';
			ctx.font="20pt arial";
			const textSize = ctx.measureText("Looking for a second player ... ");
			ctx.fillText("Looking for a second player ... ", (canvas.width / 2) - (textSize.width / 2),40);
			
			progress += 0.01;
			if (progress > 1) {
				progress = 0;
			}
			drawCircle(smallCirlce, progress);
			requestAnimationFrame(loading);
		}
		loading();
		
		function drawCircle(circle, progress) {
			ctx.beginPath();
			var start = accelerateInterpolator(progress) * circle.speed;
			var end = decelerateInterpolator(progress) * circle.speed;
			ctx.arc(circle.center.x, circle.center.y, circle.radius, (start - 0.5) * Math.PI, (end - 0.5) * Math.PI);
			ctx.lineWidth = 3;
			ctx.strokeStyle = "white";
			ctx.fill();
			ctx.stroke();
		}
		
		function accelerateInterpolator(x) {
			return x * x;
		}
		
		function decelerateInterpolator(x) {
			return 1 - ((1 - x) * (1 - x));
		}
		return (() => {socket.disconnect();})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	function chooseCanvas(GameStarted)
	{
		if (!GameStarted)
		{
			return(<canvas className='canvas' ref={ref} />)
		}
		else
		{
			if (props.mode === 'easy')
			{
				return(<Canvas updatedGame={newGame} playerWidth={10} playerHeight={100} speed={2} reverse={0}/>)
			}
			else if (props.mode === 'med')
			{
				return(<Canvas updatedGame={newGame} playerWidth={10} playerHeight={100} speed={4} reverse={0}/>)
			}
			else if (props.mode === 'hard')
			{
				return(<Canvas updatedGame={newGame} playerWidth={10} playerHeight={100} speed={6} reverse={0}/>)
			}
			else if (props.mode === 'rev')
			{
				return(<Canvas updatedGame={newGame} playerWidth={10} playerHeight={100} speed={4} reverse={-1}/>)
			}
		}
	}

	return(
		<div>
			{
				chooseCanvas(GameStarted)
			}
		</div>

	);
}
export default CanvasQueue;