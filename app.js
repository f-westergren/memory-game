const cardsArray = [
    {
      name: 'deer',
      img: 'img/deer.svg'
    },
    {
      name: 'lion',
      img: 'img/lion.svg',
    },
    {
      name: 'horse',
      img: 'img/horse.svg',
    },
    {
      name: 'gorilla',
      img: 'img/gorilla.svg',
    },
    {
      name: 'walrus',
      img: 'img/walrus.svg',
    },
    {
      name: 'tiger',
      img: 'img/tiger.svg',
    },
    {
      name: 'elephant',
      img: 'img/elephant.svg',
    },
    {
      name: 'panda',
      img: 'img/panda.svg'
    },
    {
      name: 'baboon',
      img: 'img/baboon.svg'
    },
    {
      name: 'bear',
      img: 'img/bear.svg'
    },
    {
      name: 'bison',
      img: 'img/bison.svg'
    },
    {
      name: 'boar',
      img: 'img/boar.svg'
    },
    {
      name: 'buffalo',
      img: 'img/buffalo.svg'
    },
    {
      name: 'cat',
      img: 'img/cat.svg'
    },
    {
      name: 'chipmunk',
      img: 'img/chipmunk.svg'
    }
  ]

const game = document.getElementById('game')

const grid = document.createElement('section')
grid.setAttribute('class', 'grid')
game.appendChild(grid)

const matchCounter = document.createElement('section')
const guessCounter = document.createElement('section')
const highestScore = document.createElement('section')
const finished = document.createElement('section')

matchCounter.setAttribute('class', 'counter-text')
matchCounter.setAttribute('id', 'matches')
guessCounter.setAttribute('class', 'counter-text')
guessCounter.setAttribute('id', 'guesses')
highestScore.setAttribute('class', 'counter-text')
highestScore.setAttribute('id', 'highscore')
finished.setAttribute('id', 'finished')
finished.setAttribute('class', 'title')

let firstGuess = ''
let secondGuess = ''
let count = 0
let matches = 'Matches'
let guesses = 'Guesses'
let highscore = 'Highscore'

const deck = cardsArray.concat(cardsArray) // Make two copies of each icon

const shuffle = (cards) => cards.sort(() => Math.random() - 0.5) // Randomize the order of cards in the deck

// To initiate a game
const start = () => {
  deck.forEach(card => {
  const memoryCard = document.createElement('div')
  memoryCard.dataset.name = card.name
  memoryCard.setAttribute('class', 'card')
  memoryCard.style.backgroundImage = 'url(img/card-backwards.svg)'
  grid.appendChild(memoryCard)
})

grid.appendChild(guessCounter)
grid.appendChild(matchCounter)
grid.appendChild(highestScore)
grid.appendChild(finished)

document.getElementById('highscore').innerText=highscore
document.getElementById('guesses').innerText=guesses
document.getElementById('matches').innerText=matches
}

// Flip a card
const flip = (card) => card.style.backgroundImage = `url(img/${card.dataset.name}.svg)`

// If cards match
const match = () => {
  const flipped = document.querySelectorAll('.flipped')
  flipped.forEach(card => card.classList.add('match'))
  firstGuess = ''
  secondGuess = ''
  count = 0

  if (typeof(matches) === 'string' ) {
    matches = 0
    document.getElementById('matches').classList.replace('counter-text', 'counter')
  }

  matches++
  document.getElementById('matches').innerText=matches

  if (matches === deck.length/2) {
    document.getElementById('finished').innerText="Good job!"
    setTimeout(restart, 3000)
  }
}

// Reset guesses after two flips
const resetGuesses = () => {
  const flipped = document.querySelectorAll('.flipped')
  
  // To make sure a matched pair never resets.
  flipped.forEach(card => {
    if (card.classList.length<3) {
    card.classList.remove('flipped')
    card.style.backgroundImage = 'url(img/card-backwards.svg)'
    }
  })
  firstGuess = ''
  secondGuess = ''
  count = 0
}

// Restart when all cards are matched
const restart = () => {
  let cards = document.querySelector('.grid')
  
  while (cards.firstChild.classList.length>1) {
    cards.removeChild(cards.firstChild)
  }

  if (typeof(highscore) === 'string' || guesses < highscore) {
    highscore = guesses
    document.getElementById('highscore').classList.replace('counter-text', 'counter')
  }

  document.getElementById('guesses').classList.replace('counter', 'counter-text')
  document.getElementById('matches').classList.replace('counter', 'counter-text')
  document.getElementById('finished').innerText=''
  matches = 'Matches'
  guesses = 'Guesses'
  shuffle(deck)
  start()
}

shuffle(deck)
start()

grid.addEventListener('click', (e) => {
  let clicked = e.target

  // If click is outside of board, if less than two cards are clicked or if card is already flipped.
  if (clicked.tagName === 'SECTION' || count >= 2 || clicked.classList.contains('flipped')) {
    return
  }

  clicked.classList.add('flipped')

  if (typeof(guesses) === 'string' ) {
    guesses = 0
    document.getElementById('guesses').classList.replace('counter-text', 'counter')
  }

  count++
  guesses++

  document.getElementById('guesses').innerText=guesses
  
  if (firstGuess === '' && count === 1) {
    firstGuess = clicked
    flip(firstGuess)
  }  

  if (secondGuess === '' && count === 2) {
    secondGuess = clicked
    flip(secondGuess)
  }

  if (firstGuess && secondGuess) {
    if (firstGuess.dataset.name === secondGuess.dataset.name) { 
      setTimeout(match, 1500)
    } else {
      setTimeout(resetGuesses, 1500)
    }
  }
})
