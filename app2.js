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
const gameGrid = cardsArray.concat(cardsArray)
const title = document.getElementById('title')
const counter = document.createElement('div')
let count = 0
let firstGuess = ''
let secondGuess = ''
let previousTarget = null
let totalCount = 0
let totalMatches = 0

gameGrid.sort(() => 0.5 - Math.random()) // Shuffle the deck

grid.setAttribute('class', 'grid')
game.appendChild(grid)

counter.setAttribute('class', 'counter')
counter.innerText = `Total Flips: ${totalCount}` 
title.appendChild(counter)


const match = () => {

  const flipped = document.querySelectorAll('.flipped')
  flipped.forEach(card => {
    card.classList.add('match')
  })
}

const resetGuesses = () => {
  firstGuess = ''
  secondGuess = ''
  count = 0
  let flipped = document.querySelectorAll('.flipped')
  flipped.forEach(card => {
    if (card.classList.length < 3) {
      card.classList.remove('flipped')
    }
  })
}

gameGrid.forEach(animal => {
  const card = document.createElement('div')
  card.classList.add('card')
  card.dataset.name = animal.name

  const front = document.createElement('div')
  front.classList.add('front')

  const back = document.createElement('div')
  back.classList.add('back')
  back.style.backgroundImage = `url(${animal.img})`

  grid.appendChild(card)
  card.appendChild(front)
  card.appendChild(back)
})

grid.addEventListener('click', (e) => {
  const clicked = e.target

  if (e.target.parentNode === 'SECTION' || clicked === previousTarget){
    return
  }
  totalCount++
  counter.innerText = `Total Flips: ${totalCount}`

  if (count < 2) {
    count++
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name
      clicked.parentNode.classList.add('flipped')
    } else {
      secondGuess = clicked.parentNode.dataset.name
      clicked.parentNode.classList.add('flipped')
    }
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        setTimeout(match, 1500)
        setTimeout(resetGuesses, 1500)
      } else {
        setTimeout(resetGuesses, 1500)
      }
    }
    previousTarget = clicked
  }

})