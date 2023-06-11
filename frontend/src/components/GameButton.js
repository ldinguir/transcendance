import '../styles/GameButton.css';

/*
* Ici la Création d'un boutton pour demarrer le jeu.
*/

const GameButton = (props) =>
{
	return(
			<button className='gamebutton' onClick={props.handleSettings}>
					<h1 className='playPong'>PLAY PONG</h1>
			</button>
		)
}
export default GameButton;