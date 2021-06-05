const player1 = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['nuntyaku', 'sword', 'knife'],
    attack: function(){
        console.log(this.name + ' Fight...');
    }
}

const player2 = {
    name: 'Subzero',
    hp: 25,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['katana', 'gun', 'hatchet'],
    attack: function(){
        console.log(this.name + ' Fight...');
    }
}

function createPlayer(playerClass, playerObj){
    const player = document.createElement('div');
    player.setAttribute('class', playerClass);

    const progressbar = document.createElement('div');
    progressbar.setAttribute('class', 'progressbar');

    const character = document.createElement('div');
    character.setAttribute('class', 'character');

    const life = document.createElement('div');
    life.setAttribute('class', 'life');
    life.setAttribute('style', `width: ${playerObj.hp}%;`);

    const name = document.createElement('div');
    name.setAttribute('class', 'name');
    name.innerText = playerObj.name;

    progressbar.appendChild(life);
    progressbar.appendChild(name);  
    
    const img = document.createElement('img');
    img.setAttribute('src', playerObj.img);

    character.appendChild(img);

    player.appendChild(progressbar);
    player.appendChild(character);

    const arenas = document.querySelector('.arenas');
    arenas.appendChild(player);

}

createPlayer('player1', player1);
createPlayer('player2', player2);