import Player from './player.js';
import { generateLogs, enemyAttack, playerAttack, executeKicks } from './utils.js';
import { arenas, formControl } from './htmlElements.js';

class Game {
	constructor() {}

	player1 = new Player({
		player: 1,
		name: 'Scorpion',
		hp: 100,
		img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
		rootSelector: arenas,
	});

	player2 = new Player({
		player: 2,
		name: 'Subzero',
		hp: 100,
		img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
		rootSelector: arenas,
	});

	start = () => {
		const enemyPlayer = this.player1;
		const attackPlayer = this.player2;
		enemyPlayer.createPlayer();
		attackPlayer.createPlayer();
		generateLogs('start', enemyPlayer, attackPlayer);

		formControl.addEventListener('submit', function (evt) {
			evt.preventDefault();

			const enemy = enemyAttack();
			const attack = playerAttack();

			executeKicks(enemy, attack, enemyPlayer, attackPlayer);
		});
	};
}

export default Game;