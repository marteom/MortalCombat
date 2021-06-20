import Player from './player.js';
import { generateLogs, enemyAttack, playerAttack, executeKicks, getRandom } from './utils.js';
import { arenas, formControl } from './htmlElements.js';

let player1;
let player2;

class Game {
	constructor() {}

	// getPlayers = async () => {
	// 	const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
	// 	return body;
	// } 

	start = async () => {
		//const players = await this.getPlayers();
		const p1 = JSON.parse(localStorage.getItem('player1'));
		const p2 = await fetch(
			'https://reactmarathon-api.herokuapp.com/api/mk/player/choose'
		).then((res) => res.json());

		player1 = new Player({
			...p1,
			player: 1,
			rootSelector: arenas,
		});

		player2 = new Player({
			...p2,
			player: 2,
			rootSelector: arenas,
		});

		player1.createPlayer();
		player2.createPlayer();

		generateLogs('start', player1, player2);

		formControl.addEventListener('submit', async function (evt) {
			evt.preventDefault();
			const attack = playerAttack();
			const fightObj = await fetch(
				'http://reactmarathon-api.herokuapp.com/api/mk/player/fight',
				{
					method: 'POST',
					body: JSON.stringify({
						hit: attack.hit,
						defence: attack.defence,
					}),
				}
			).then((res) => res.json());

			executeKicks(fightObj.player1, fightObj.player2, player1, player2);
		});
	};
}

export default Game;