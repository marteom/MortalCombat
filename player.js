import { createElement } from './utils.js';

class Player {
  constructor(props){
    this.player = props.player,
    this.name = props.name,
    this.hp = props.hp,
    this.img = props.img,
    this.selector = `player${this.player}`,
    this.rootSelector = props.rootSelector
  }

  attack = () => {
        console.log(this.name + ' Fight...');
  }

  changeHP = (damage) => {
    if(damage >= this.hp) {
      this.hp = 0;
    }
    else{
      this.hp -= damage;
    }
  }
  
  elHP = () => {
      return document.querySelector(`.${this.selector} .life`);
  }
  
  renderHP = () => {
    const playerLife = this.elHP();
    playerLife.style.width = this.hp + '%';
  }

  createPlayer = () => {
    const playerEl = createElement('div', this.selector);
    const progressbar = createElement('div', 'progressbar');
    const character = createElement('div', 'character');
    const lifeEl = createElement('div', 'life');
    lifeEl.setAttribute('style', `width: ${this.hp}%;`);

    const nameEl = createElement('div', 'name');
    nameEl.innerText = this.name;

    progressbar.appendChild(lifeEl);
    progressbar.appendChild(nameEl);  
    
    const imgEl = createElement('img');
    imgEl.setAttribute('src', this.img);

    character.appendChild(imgEl);

    playerEl.appendChild(progressbar);
    playerEl.appendChild(character);

    this.rootSelector.appendChild(playerEl);

    return playerEl;
}

}

export default Player;