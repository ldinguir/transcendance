import { useEffect, useState } from "react";
import '../styles/Online.css'
import { io } from "socket.io-client";

const Online = () =>
{
	const [onlineUsers, setOnlineUsers] = useState([]);
	// const [clientId, setClientId] = useState('');
	
	useEffect(() => { // Si j'utilise pas useEffect j'ai genre une boucle infinie de client 
	// permet que socket = io(..) soit appelé une seule fois lors du montage du composant
	// Ca veut dire qu'a chaque fois que le composant est monté ca refait ce code d'ou la panoplie de clients qui se connectent 
	
	// Permet de configurer notre socket :
	// Ça permet de créer une instance du client socket.io
	// Ça permet d'établir une connexion avec le serveur WebSocket
	// io() est une fonction qui permet de créer une instance du client socket.io
	// Ça établie une connexion entre notre application Réact et le serveur WebSocket
	const socket = io('http://localhost:3000');

	// socket.on('clientInfo', (id) => {
		// setClientId(id); // Stocke l'ID du client dans clientID
	// });
	// console.log(`Info ID du client : ${clientId}`);

	socket.on('onlineUsers', (users) => {
		setOnlineUsers(users);
	});

	return (() => {socket.disconnect();}) // Si je fais pas socket.disconnect j'ai plusieurs clients au lieu d'un seul de connecter 
	// Dans le return ca s'effectue au demontage du composant. Donc ici au demontage du composant on nettoie 	
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
	
	return(
		<div className="online-div">
			<p className="online">Online</p>
			<ul>
        		{onlineUsers.map((userId) => (
          		<li className="list" key={userId}>{userId}</li>
        		))}
      		</ul>
		</div>
	)
}
export default Online;