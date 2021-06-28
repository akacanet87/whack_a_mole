let gameTime = 10
let gameScore = 0
let x = Math.floor(Math.random() * 4) + 2
let y = Math.floor(Math.random() * 4) + 2
let moleLimit = 4
let holeTotal = x * y
let moleList: NodeListOf<HTMLElement>

console.log('x', x)
console.log('y', y)
console.log('holeTotal', holeTotal)

const getRandomNumber = (length: number) => {
  return Math.floor(Math.random() * length)
}

const createRandomIndexList = (arrayLength: number, limit: number) => {
  let randomArray = [] as number[]
  while (randomArray.length < limit) {
    let randomNumber = getRandomNumber(arrayLength)
    if (randomArray.indexOf(randomNumber) < 0) {
      randomArray.push(randomNumber)
    }
  }
  return randomArray
}

const popMoles = () => {
  let randomPointList = createRandomIndexList(holeTotal, moleLimit)
  let fakeMoleIndex = Math.floor(Math.random() * randomPointList.length * 2)
  moleList.forEach((mole, index) => {
    if (randomPointList.indexOf(index) >= 0) {
      mole.classList.add('active')
      if (fakeMoleIndex === index) {
        mole.classList.add('fake')
      }

      setTimeout(() => {
        mole.classList.remove('active')

        setTimeout(() => {
          mole.classList.remove('fake')
          mole.classList.remove('hit')
        }, 1000)
      }, 2000)
    }
  })
}

const onGameEnd = () => {

}

export const initGame = () => {
  console.log('createMoleList')
  let timeHandler: NodeJS.Timeout = null
  let moleHandler: NodeJS.Timeout = null

  let width = window.innerWidth > 480 ? 480 / x - 8 : window.innerWidth / x - 8
  let height = window.innerHeight / y - 8
  let holeSize = width > height ? height : width
  const moleBox = document.getElementById('moleBox')

  for (let i = 0; i < holeTotal; i++) {
    const moleItem = document.createElement('div')
    moleItem.className = `mole-item`
    moleItem.style.width = holeSize + 'px'
    moleItem.style.height = holeSize + 'px'
    moleItem.style.padding = '4px'
    moleItem.style.padding = '4px'
    moleItem.innerHTML = `
      <div class="mole mole-${i}"></div>
    `

    moleBox.appendChild(moleItem)
  }

  moleList = document.querySelectorAll('.mole')
  moleList.forEach((mole, index) => {
    mole.addEventListener('click', (e: HTMLElement & MouseEvent) => {
      if (mole.className.indexOf('active') >= 0) {
        if (mole.className.indexOf('fake') >= 0) {
          if (gameScore > 0) {
            gameScore--
          }
        } else {
          gameScore++
        }
        mole.classList.add('hit')
        mole.classList.remove('active')
      }
      console.log('gameScore', gameScore)
    }, true)
  })

  timeHandler = setInterval(() => {
    gameTime -= 1
    console.log('gameTime', gameTime)
    if (gameTime <= -1) {
      clearInterval(timeHandler)
      timeHandler = null
    }
  }, 1000)

  moleHandler = setInterval(() => {
    if (gameTime <= -1) {
      clearInterval(moleHandler)
      moleHandler = null
      onGameEnd()
    } else {
      popMoles()
    }
  }, 3000)
}