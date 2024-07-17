let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,    
  lose: 0,
  tie: 0
};

updateScoreElement();

function game() {
let Com = '';
const randomNum = Math.random();

if ((randomNum >= 0) && (randomNum < 0.33)) {
  Com = 'rock';       
}

if ((randomNum >= 0.33) && (randomNum < 0.66)) {
  Com = 'paper';       
}
        
if ((randomNum >= 0.66) && (randomNum <  1)) {
  Com = 'scissors';       
}

return Com;
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  game_1('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  game_1('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  game_1('scissors');
});

function reset() {
  score = {
    win: 0,    
    lose: 0,
    tie: 0
  };

  localStorage.removeItem('score');
  updateScoreElement();   
  document.querySelector('.player_choice')
      .innerHTML = '';
  document.querySelector('.player_result')
    .innerHTML = '';  
}; 

document.querySelector('.js-reset-button').addEventListener       ('click', () => {
    resetConfrim();
})

function resetConfrim() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = `Are you sure you want to reset the score? 
    <button class ="yesBtn">
      Yes
    </button> 
    <button class="noBtn">
      No
    </button>`;

  document.querySelector('.yesBtn').addEventListener('click', () => {
    document.querySelector('.js-reset-confirmation')
      .innerHTML = '';
    document.querySelector('.play_result')
      .innerHTML = '';
    document.querySelector('.player_choice')
      .innerHTML = '';
    reset();
  });
  
  document.querySelector('.noBtn').addEventListener('click', () => 
  {
    document.querySelector('.js-reset-confirmation')
    .innerHTML = '';  
  });
}


document.querySelector('.autoplay').addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event)=>{
  if (event.key === "r"){
    game_1('rock');
  } else if (event.key === "p"){
    game_1('paper');
  } else if (event.key === "s"){
    game_1('scissors');
  } else if (event.key === "Backspace"){
    resetConfrim();
  } else if (event.key === 'a') {
    autoPlay();
  }
});

function game_1(player) {
const Com = game();
let result ='';
if (player === 'scissors') {
    if (Com === 'scissors') {
      result = 'Its a Tie';
    }

    if (Com === 'paper') {
      result = 'Congratulations, You win';
    }
            
    if (Com === 'rock') {
      result = 'You lose try again';
    }
} else if (player === 'rock') {
    if (Com === 'rock') {
      result = 'Its a Tie';
    }

    if (Com === 'scissors') {
      result = 'Congratulations, You win';
    }
            
    if (Com === 'paper') {
      result = 'You lose try again';
    }
} else if (player === 'paper') {
    if (Com === 'paper') {
      result = 'Its a Tie';
    }

    if (Com === 'rock') {
      result = 'Congratulations, You win';
    }
            
    if (Com === 'scissors') {
      result = 'You lose try again';
    }
}

if (result === 'Congratulations, You win') {
  score.win ++;
} else if (result === 'You lose try again') {
  score.lose ++;
} else if (result === 'Its a Tie') {
  score.tie ++;
}

localStorage.setItem('score', JSON.stringify(score));

document.querySelector('.player_choice')
  .innerHTML = result;

document.querySelector('.play_result')
  .innerHTML = `You
  <img src="Rock-Paper-Scissors/${player}-emoji.png" 
  alt="Rock"  class="icon">
  <img src="Rock-Paper-Scissors/${Com}-emoji.png" 
  alt="Rock"  class="icon">
  Computer`;

updateScoreElement();

// alert(`You picked ${player}; COM picked ${Com}; ${result}\nWins: ${score.win} Loses: ${score.lose} Ties: ${score.tie}`);
}

function updateScoreElement() {
document.querySelector('.js-score')
.innerHTML = `Wins: ${score.win} Losses: ${score.lose} Ties: ${score.tie}`;
}

let isAutoplaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const comAutoPlay = game();
      game_1(comAutoPlay); 
    }, 1000);
    isAutoplaying = true;
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
  }
  stop();
}

function stop() {
  let buttonElement = document.querySelector('.autoplay');

  if (buttonElement.innerText === 'Auto Play') {
    buttonElement.innerHTML = 'Stop Play';
    buttonElement.classList.add('autoplay1');
  } else if (buttonElement.innerText ==='Stop Play' && !isAutoplaying) {
    buttonElement.innerHTML = 'Continue Auto Play';
  } else if (buttonElement.innerText ==='Continue  Play' && isAutoplaying) {
    buttonElement.innerHTML = 'Stop Play';
  } else {
    buttonElement.classList.remove('autoplay1');
    buttonElement.innerHTML = 'Auto Play';
  }
}


