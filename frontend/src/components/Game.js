import { useState } from 'react';
import GameButton from './GameButton';
import GameSettings from './GameSettings';


const Game = () =>
{
	const [settings, setSettings] = useState(false);
	
	const handleSettings = () => 
	{
		setSettings(true);
	}

	return(
		<div>
			{
				!settings ? (<GameButton handleSettings={handleSettings}/>) : (<GameSettings/>)
			}
		</div>
	)
}
export default Game;