import { logs } from './const.js';
import {player1, player2} from './players.js';
import { arenas, formControl, fightButton,chat } from './htmlElements.js';

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

export const createElement = (tag, className) => {
    const newTag = document.createElement(tag);
    if(className){
      newTag.classList.add(className);
    }
    return newTag;
  }

  const getRandom = (num) => Math.ceil(Math.random() * num);

  export function changeHP(damage){
    if(damage >= this.hp){
      this.hp = 0;
    }
    else{
      this.hp -= damage;
    }
  }
  
  export function elHP(){
      return document.querySelector(`.player${this.player} .life`);
  }
  
  export function renderHP(){
    const playerLife = this.elHP();
    playerLife.style.width = this.hp + '%';
  }

  const playerWin = (name) =>{
    const winTitle = createElement('div', 'loseTitle');
    if(name){
      winTitle.innerText = name + ' win';
    }
    else{
      winTitle.innerText = 'draw';
    }
    return winTitle;
  }

  const createReloadButton = () => {
    const reloadDiv = createElement('div', 'reloadWrap');
    const reloadButton = createElement('button', 'button');
    reloadButton.innerText = 'Restart';

    reloadButton.addEventListener('click', function(){
        window.location.reload();
    })

    reloadDiv.appendChild(reloadButton);

    return reloadDiv;
}

export const enemyAttack = () => {
    const hit = ATTACK[getRandom(ATTACK.length) -1];
    const defence = ATTACK[getRandom(ATTACK.length) -1];
  
    return {
      hit,
      defence,
      value: getRandom(HIT[hit]),
    }
  }
  
  export const playerAttack = () => {
    const attack = {};
    for(let element of formControl){
      if(element.name === 'hit' && element.checked){
        attack.value = getRandom(HIT[element.value]);
        attack.hit = element.value;
      }
  
      if(element.name === 'defence' && element.checked){
        attack.defence = element.value;
      }
  
      element.checked = false;
    }
    return attack;
  }

  const displayedDamage = (player, damage) => {
    player.changeHP(damage);
    player.renderHP();
  }
  
  const showResult = () => {
    if(player1.hp === 0 || player2.hp === 0){
      fightButton.disabled = true;
      arenas.appendChild(createReloadButton());
    }
  
    if(player1.hp === 0 && player1.hp < player2.hp){
      arenas.appendChild(playerWin(player2.name));
      generateLogs('end', player2, player1);
    }
    else if(player2.hp === 0 && player2.hp < player1.hp){
      arenas.appendChild(playerWin(player1.name));
      generateLogs('end', player1, player2);
    }
    else if(player1.hp === 0 && player2.hp === 0){
      arenas.appendChild(playerWin());
      generateLogs('draw', player1, player2);
    }
  }

  export const executeKicks = (enemy, attack) => {
    if(enemy.hit !== attack.defence){
      displayedDamage(player2, enemy.value);
      generateLogs('hit', player1, player2, ` [-${enemy.value}] [${player2.hp}/100]`);
    }
    else{
      generateLogs('defence', player1, player2);
    }
  
    if(attack.hit !== enemy.defence){
      displayedDamage(player1, attack.value);
      generateLogs('hit', player2, player1, ` [-${attack.value}] [${player1.hp}/100]`);
    }
    else{
      generateLogs('defence', player2, player2);
    }
  
    showResult();
  }

  export const generateLogs = (type, player1, player2, damageText) => {
    const startDate = new Date();
    const startTime = `${startDate.getHours()}:${startDate.getMinutes()}`;
    let text = '';
  
    switch(type){
      case 'start':
        text = logs[type].replace('[time]', startTime).replace('[player1]', player1.name).replace('[player2]', player2.name);
        break;
      case 'end':
        text = logs[type][getRandom(logs[type].length) - 1].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
        break;
      case 'hit':
        text = logs[type][getRandom(logs[type].length) - 1].replace('[playerDefence]', player2.name).replace('[playerKick]', player1.name);
        break;
      case 'defence':
        text = logs[type][getRandom(logs[type].length) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
        break;
      case 'draw':
        text = logs[type];
        break;
      default:
        return;
    }
  
    if(damageText){
      text += damageText;
    }
  
    chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);
  
  }