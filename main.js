const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['nuntyaku', 'sword', 'knife'],
    attack: function(){
        console.log(this.name + ' Fight...');
    },
    changeHP,
    elHP,
    renderHP,
}

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['katana', 'gun', 'hatchet'],
    attack: function(){
        console.log(this.name + ' Fight...');
    },
    changeHP,
    elHP,
    renderHP,
}

function createElement(tag, className){
  const newTag = document.createElement(tag);
  if(className){
    newTag.classList.add(className);
  }
  return newTag;
}

function createPlayer(playerObj){
    const player = createElement('div', `player${playerObj.player}`);
    const progressbar = createElement('div', 'progressbar');
    const character = createElement('div', 'character');
    const life = createElement('div', 'life');
    life.setAttribute('style', `width: ${playerObj.hp}%;`);

    const name = createElement('div', 'name');
    name.innerText = playerObj.name;

    progressbar.appendChild(life);
    progressbar.appendChild(name);  
    
    const img = createElement('img');
    img.setAttribute('src', playerObj.img);

    character.appendChild(img);

    player.appendChild(progressbar);
    player.appendChild(character);

    return player;
}

function getRandom(num){
  return Math.ceil(Math.random() * num);
}

function changeHP(damage){
  if(damage >= this.hp){
    this.hp = 0;
  }
  else{
    this.hp -= damage;
  }
}

function elHP(){
    return document.querySelector(`.player${this.player} .life`);
}

function renderHP(){
  const playerLife = this.elHP();
  playerLife.style.width = this.hp + '%';
}

function playerWin(name){
  const winTitle = createElement('div', 'loseTitle');
  if(name){
    winTitle.innerText = name + ' win';
  }
  else{
    winTitle.innerText = 'draw';
  }
  return winTitle;
}

function createReloadButton(){
    const reloadDiv = createElement('div', 'reloadWrap');
    const reloadButton = createElement('button', 'button');
    reloadButton.innerText = 'Restart';

    reloadButton.addEventListener('click', function(){
        window.location.reload();
    })

    reloadDiv.appendChild(reloadButton);

    return reloadDiv;
}

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

randomButton.addEventListener('click', function(){
  player1.changeHP(getRandom(20));
  player1.renderHP();

  player2.changeHP(getRandom(20));
  player2.renderHP();

  if(player1.hp === 0 || player2.hp === 0){
    this.disabled = true;
    arenas.appendChild(createReloadButton());
  }

  if(player1.hp === 0 && player1.hp < player2.hp){
    arenas.appendChild(playerWin(player2.name));
  }
  else if(player2.hp === 0 && player2.hp < player1.hp){
    arenas.appendChild(playerWin(player1.name));
  }
  else if(player1.hp === 0 && player2.hp === 0){
    arenas.appendChild(playerWin());
  }
})