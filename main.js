import {player1, player2} from './players.js';
import { createElement, generateLogs, enemyAttack, playerAttack, executeKicks } from './utils.js';
import { arenas, formControl } from './htmlElements.js';

const createPlayer = (playerObj) => {
    const {name, img, player, hp} = playerObj;

    const playerEl = createElement('div', `player${player}`);
    const progressbar = createElement('div', 'progressbar');
    const character = createElement('div', 'character');
    const lifeEl = createElement('div', 'life');
    lifeEl.setAttribute('style', `width: ${hp}%;`);

    const nameEl = createElement('div', 'name');
    nameEl.innerText = name;

    progressbar.appendChild(lifeEl);
    progressbar.appendChild(nameEl);  
    
    const imgEl = createElement('img');
    imgEl.setAttribute('src', img);

    character.appendChild(imgEl);

    playerEl.appendChild(progressbar);
    playerEl.appendChild(character);

    return playerEl;
}

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);

formControl.addEventListener("submit", function(evt){
  evt.preventDefault();

  const enemy = enemyAttack();  
  const attack = playerAttack();

  executeKicks(enemy, attack);
});