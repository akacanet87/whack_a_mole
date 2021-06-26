console.log('index.ts 다')

interface Mole {
  isPop: boolean,
  isFake: boolean,
}

let gameTime = 10
let gameScore = 0
let timeHandler
let moleHandler
let x = Math.floor(Math.random() * 4) + 2
let y = Math.floor(Math.random() * 4) + 2
let moleLimit = 4
let holeTotal = x * y
let holeArray = new Array(holeTotal)

console.log('x', x)
console.log('y', y)
console.log('holeTotal', holeTotal)
console.log('holeArray', holeArray)

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
  console.log('randomPointList', randomPointList, gameTime)
  let fakeMoleIndex = Math.floor(Math.random() * randomPointList.length * 2)
  let moleList = document.querySelectorAll('.mole')
  console.log('moleList', moleList)
  moleList.forEach((mole, index) => {
    if (randomPointList.indexOf(index) >= 0) {
      mole.classList.add('active')
      if (fakeMoleIndex === index) {
        mole.classList.add('fake')
      }

      setTimeout(() => {
        mole.classList.remove('active')
        mole.classList.remove('fake')
      }, 2000)
    }
  })
}

const initGame = () => {
  console.log('createMoleList')
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

  let moleList = document.querySelectorAll('.mole')
  moleList.forEach((mole, index) => {
    mole.addEventListener('click', (e: HTMLElement & MouseEvent) => {
      gameScore++
      mole.classList.remove('active')
    }, true)
  })

  timeHandler = setInterval(() => {
    gameTime -= 1
    if (gameTime <= -1) {
      timeHandler = null
    }
  }, 1000)

  moleHandler = setInterval(() => {
    if (gameTime <= -1) {
      moleHandler = null
    } else {
      popMoles()
    }
  }, 3000)
}

initGame()


// import './assets/styles/common.scss'
// import { Mole } from './interfaces/Game'
//
// console.log('index.ts 다')
//
// let gameTime = 60
// let timeHandler
// let moleHandler
// let holeArray: Array<Mole[]>
// let x = 4
// let y = 8
// let limit = 6
// let holeTotalCount = x * y
//
// interface MolePoint {
//   x: number
//   y: number
// }
//
// const createMoleList = () => {
//   const moleBox = document.getElementById('moleBox')
//   holeArray.forEach((hole, index) => {
//     const moleLine = document.createElement('ul')
//     hole.forEach((h, index) => {
//       const moleItem = document.createElement('li')
//       moleLine.appendChild(moleItem)
//     })
//     moleBox.appendChild(moleLine)
//   })
// }
//
// const getRandomNumber = (length: number) => {
//   return Math.floor(Math.random() * length)
// }
//
// const clearHoleArray = () => {
//   holeArray = new Array(x)
//   for (let i = 0; i < x; i++) {
//     holeArray[i] = new Array(y)
//
//     for (let j = 0; j < y; j++) {
//       holeArray[i][j] = {
//         isFake: false,
//         isPop: false,
//       } as Mole
//     }
//   }
// }
//
// const createRandomPointList = (xLength: number, arrayLength: number, limit: number) => {
//   let randomArray = [] as number[]
//   while (randomArray.length < limit) {
//     let randomNumber = getRandomNumber(arrayLength)
//     if (randomArray.indexOf(randomNumber) <= 0) {
//       randomArray.push(randomNumber)
//     }
//   }
//   let randomPointList = [] as MolePoint[]
//   randomArray.forEach((number) => {
//     let x = number % xLength
//     let y = Math.floor(number / xLength)
//     randomPointList.push({
//       x,
//       y,
//     } as MolePoint)
//   })
//   return randomPointList
// }
//
// const popMoles = () => {
//   clearHoleArray()
//   let randomPointList = createRandomPointList(x, holeTotalCount, limit)
//   console.log('randomPointList', randomPointList, gameTime)
//   let fakeMoleIndex = Math.floor(Math.random() * randomPointList.length * 2)
//   randomPointList.forEach((molePoint: MolePoint, index) => {
//     console.log('molePoint', molePoint)
//     holeArray[molePoint.x][molePoint.y].isPop = true
//     holeArray[molePoint.x][molePoint.y].isFake = fakeMoleIndex === index
//   })
//   console.log('holeArray', holeArray, gameTime)
// }
//
// const initGame = () => {
//   gameTime = 4
//
//   timeHandler = setInterval(() => {
//     gameTime -= 1
//     if (gameTime <= -1) {
//       timeHandler = null
//     }
//   }, 1000)
//
//   moleHandler = setInterval(() => {
//     if (gameTime <= -1) {
//       moleHandler = null
//     } else {
//       popMoles()
//     }
//   }, 3000)
//
//
// }
//
// initGame()