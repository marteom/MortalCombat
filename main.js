const arenas = document.querySelector('.arenas');
const formControl = document.querySelector('.control');
const fightButton = document.querySelector('.button');
const chat = document.querySelector('.chat');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
      'Результат удара [playerWins]: [playerLose] - труп',
      '[playerLose] погиб от удара бойца [playerWins]',
      'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
      '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
      '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
      '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
      '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
      '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
      '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
      '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
      '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
      '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
      '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
      '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
      '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
      '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
      '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
      '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
      '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
      '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
      '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
      '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
      '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
      '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
      '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
      '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
      '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};

function generateLogs(type, player1, player2, damageText){
  const startDate = new Date();
  const startTime = `${startDate.getHours()}:${startDate.getMinutes()}`;
  let text = '';

  switch(type){
    case 'start':
      text = logs[type].replace('[time]', startTime).replace('[player1]', player1.name).replace('[player2]', player2.name);
      break;
    case 'end':
      text = logs[type][getRandom(3) - 1].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
      break;
    case 'hit':
      text = logs[type][getRandom(18) - 1].replace('[playerDefence]', player2.name).replace('[playerKick]', player1.name);
      break;
    case 'defence':
      text = logs[type][getRandom(8) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
      break;
    case 'draw':
      text = logs[type];
      break;
  }

  if(damageText){
    text += damageText;
  }

  chat.insertAdjacentHTML('afterbegin', `<p>${text}</p>`);

}

const ATTACK = ['head', 'body', 'foot'];

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

function enemyAttack(){
  const hit = ATTACK[getRandom(3) -1];
  const defence = ATTACK[getRandom(3) -1];

  return {
    hit,
    defence,
    value: getRandom(HIT[hit]),
  }
}

function playerAttack(){
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

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);

formControl.addEventListener("submit", function(evt){
  evt.preventDefault();

  const enemy = enemyAttack();  
  const attack = playerAttack();

  executeKicks(enemy, attack);
});

function displayedDamage(player, damage){
  player.changeHP(damage);
  player.renderHP();
}

function showResult(){
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

function executeKicks(enemy, attack){
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