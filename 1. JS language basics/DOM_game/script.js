var scores, roundScore, activePlayer, gamePlaying

start()

function roll() {
    if(gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1
    
        var diceDOM = document.querySelector('.dice1')
        diceDOM.style.display = 'block'
        diceDOM.src = 'dice-' + dice + '.png'

        if(dice !== 1) {
            roundScore += dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        }else {
            nextPlayer()
        }
    }
}

function hold() {
    if(gamePlaying) {
        scores[activePlayer] += roundScore
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

        if(scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active')
            gamePlaying = false
        } else {
            nextPlayer()
        }
    }
}

function init() {
    scores = [0, 0]
    roundScore = 0
    activePlayer = 0
    
    document.querySelector('.dice1').style.display = 'none'
    
    document.querySelector('#score-0').textContent = '0'
    document.querySelector('#current-0').textContent = '0'
    document.querySelector('#score-1').textContent = '0'
    document.querySelector('#current-1').textContent = '0'
    document.querySelector('#name-1').textContent = 'Player 1'
    document.querySelector('#name-2').textContent = 'Player 2'
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.player-1-panel').classList.remove('active')
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.querySelector('.dice1').style.display = 'none'
}

document.querySelector('.btn-roll').addEventListener('click', roll)

document.querySelector('btn-hold').addEventListener('click', hold)

document.querySelector('.btn-new').addEventListener('click', init)