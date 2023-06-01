import React from 'react';
import useCanvas from './useCanvas';

const Canvas = props => 
{
	const { gameZone, ballMove, ...rest } = props; // ??
	// Creer une référence sur l'element canvas
	const canvasRef = useCanvas(gameZone, ballMove);

	return <canvas ref={canvasRef} {...rest}/>;
}

export default Canvas;