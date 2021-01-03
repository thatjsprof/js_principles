var score, scores, roundScore, activePlayer, gamePlaying

init()

function setScore() {
    score = Number(document.querySelector('#score').value) || 100
    document.getElementById('winning_score').textContent = score
}

function roll() {
    if(gamePlaying) {
        var dice1 = Math.floor(Math.random() * 6) + 1
        var dice2 = Math.floor(Math.random() * 6) + 1

        if(dice1 + dice2 == 12) {
            roundScore = 0
            nextPlayer()
        }
    
        var diceDOM1 = document.querySelector('.dice1')
        diceDOM1.style.display = 'block'
        diceDOM1.src = 'dice-' + dice1 + '.png'
        var diceDOM2 = document.querySelector('.dice2')
        diceDOM2.style.display = 'block'
        diceDOM2.src = 'dice-' + dice2 + '.png'

        if(scores[activePlayer] >= score) {
            detWinner()
        }

        if(dice1 > 1 && dice2 > 1) {
            roundScore += (dice1 + dice2)
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        }else {
            nextPlayer()
        }
    }
}

function detWinner() {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active')
    gamePlaying = false
}

function hold() {
    if(gamePlaying) {
        scores[activePlayer] += roundScore
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

        if(scores[activePlayer] >= score) {
            detWinner()
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
    document.querySelector('.dice2').style.display = 'none'
    
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
    gamePlaying = true
    setScore()
}

function nextPlayer() {
    scores[activePlayer] += roundScore
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0

    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    document.querySelector('.dice1').style.display = 'none'
    document.querySelector('.dice2').style.display = 'none'
}

document.querySelector('.btn-roll').addEventListener('click', roll)

document.querySelector('.btn-hold').addEventListener('click', hold)

document.querySelector('.btn-new').addEventListener('click', init)

document.querySelector('#add_score').addEventListener('click', setScore)