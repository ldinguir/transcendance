import '../styles/GameButton.css';
import '../styles/Canvas.css';
import '../styles/GameSettings.css';
import { useState } from 'react';
import CanvasQueue from './CanvasQueue';
// import Canvas from './Canvas';

const GameSettings = () =>
{
	const [startGame, setStartGame] = useState(false);
	const [mode, setMode] = useState('');


	const handlePlay = (mode) => 
	{
		setStartGame(true);
		setMode(mode);
	}

	return(
		<div>
			{!startGame ?
			(<div className='gamesettings'>
				<button className='easy' onClick={()=>handlePlay('easy')}>
					<h1>EASY</h1>
				</button>
				<button className='medium' onClick={()=>handlePlay('med')}>
					<h1>MEDIUM</h1>
				</button>
				<button className='hard' onClick={()=>handlePlay('hard')}>
					<h1>HARD</h1>
				</button>
				<button className='reverse-mode' onClick={()=>handlePlay('rev')}>
					<h1>REVERSE MODE</h1>
				</button>
			</div>) : 
			    <CanvasQueue mode={mode}/>
			// ((mode === -1) ? 
			// (<Canvas playerWidth={10} playerHeight={100} speed={4} reverse={-1}/>) : 
			// (<Canvas playerWidth={10} playerHeight={100} speed={mode} reverse={0}/>)
			// )
			}
		</div>
		)
}
export default GameSettings;