/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice1 as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, prevdice1, prevdice2, winning_score;

init();
winning_score();

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(winning_score !== 0){
		document.getElementById('error').textContent='';
	if(gamePlaying){
	dice1 = Math.floor(Math.random() * 6) + 1;	
	dice2 = Math.floor(Math.random() * 6) + 1;	

	dice1_num = document.querySelector('.dice1');
	dice1_num.src = 'dice-' + dice1 + '.png';
	dice1_num.style.display='block';
	
	dice2_num = document.querySelector('.dice2');
	dice2_num.src = 'dice-' + dice2 + '.png';
	dice2_num.style.display='block';

	if(dice1 > 1 && dice2 > 1){
		if((dice1 === 6 && prevdice1 === 6) || (dice2 === 6 && prevdice2 === 6)){
			roundScore = 0;
			nextPlayer();
		}else{
			roundScore += (dice1 + dice2);
		}
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	}else{

		nextPlayer();

		roundScore += (dice1 + dice2);
	}
	prevdice1 = dice1;
	prevdice2 = dice2;
	console.log('Previous Dice 1: ' + prevdice1);
	console.log('Previous Dice 2: ' + prevdice2);
	}
	}else{
		document.getElementById('error').textContent='You must enter a winning score';
	}
	//document.querySelector()
});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(winning_score !== 0){
		document.getElementById('error').textContent='';
	if(gamePlaying){
	scores[activePlayer] += roundScore;
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

	if(scores[activePlayer] >= winning_score){
		document.querySelector('#name-' + activePlayer).textContent='Winner!';
		document.querySelector('.dice1').style.display='none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		gamePlaying = false;
	}else{
		nextPlayer();
	}
    }
	}else{
		document.getElementById('error').textContent='You must enter a winning score';
	}
});

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('#current-' + activePlayer).textContent = roundScore;
	document.querySelector('.dice1').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
}

function init(){
	scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('error').textContent='';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.add('active');
}

function winning_score(){
	winning_score = 0;

    document.querySelector('#add_score').addEventListener('click', function(){

    	scored = document.getElementById('score').value;
    	console.log(scored);
    	if(scored == ""){
    		document.getElementById('error').textContent='You must enter a winning score';
    	}else{
    		winning_score = scored;
    		document.getElementById('winning_score').textContent = ' ' + winning_score;
    	}
    	init();
    })
}

document.querySelector('.btn-new').addEventListener('click', init)