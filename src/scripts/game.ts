import { createRandomIndexList } from './utils'
import store from '../store'
import router from '../router'

let gameTime: number
let gameTimeHandler: NodeJS.Timeout = null
let molePopTimeHandler: NodeJS.Timeout = null
let moleList: NodeListOf<HTMLElement>
let totalHoles: number
let moleLimit: number
let isPaused: boolean

const createMoles = (xAxis: number, yAxis: number, totalHoles: number) => {
  let width = window.innerWidth > 480 ? 480 / xAxis - 8 : window.innerWidth / xAxis - 8
  let height = (window.innerHeight - 136) / yAxis - 8
  let holeSize = width > height ? height : width
  const moleBox = document.getElementById('moleBox')

  let containerWidth = window.innerWidth > 480 ? 480 : window.innerWidth
  let padding = (containerWidth - ((holeSize + 16) * xAxis )) / 2
  moleBox.innerHTML = ``
  moleBox.style.paddingLeft = `${padding}px`
  moleBox.style.paddingRight = `${padding}px`

  for (let i = 0; i < totalHoles; i++) {
    const moleItem = document.createElement('div')
    moleItem.className = `mole-item`
    moleItem.style.width = `${holeSize}px`
    moleItem.style.height = `${holeSize}px`
    moleItem.style.padding = '4px'
    moleItem.style.padding = '4px'
    moleItem.innerHTML = `
      <div class="mole mole-${i}"></div>
    `

    moleBox.appendChild(moleItem)
  }
}

const registerMoleEvent = () => {
  moleList = document.querySelectorAll('.mole')
  moleList.forEach((mole, index) => {
    mole.addEventListener('click', (e: HTMLElement & MouseEvent) => {
      let gameScore = store.getters('GAME_SCORE')
      if (mole.className.indexOf('active') >= 0) {
        if (mole.className.indexOf('fake') >= 0 && gameScore > 0) {
          gameScore -= 1
        } else {
          gameScore += 1
        }
      }
      const scoreBoard = document.getElementById('scoreBoard')
      scoreBoard.innerHTML = gameScore.toString()
      store.dispatch('GAME_SCORE', gameScore)
      mole.classList.add('hit')
      mole.classList.remove('active')
    }, true)
  })
}

const popMoles = (popTime: number) => {
  console.log('popMoles')
  let randomPointList = createRandomIndexList(totalHoles, moleLimit)
  let fakeMoleIndex = Math.floor(Math.random() * randomPointList.length * 2)

  moleList.forEach((mole, index) => {
    if (randomPointList.indexOf(index) >= 0) {
      if (fakeMoleIndex === index) {
        mole.classList.add('fake')
      }
      mole.classList.add('active')

      setTimeout(() => {
        mole.classList.remove('active')

        setTimeout(() => {
          mole.classList.remove('fake')
          mole.classList.remove('hit')
        }, 800)
      }, popTime)
    }
  })
}

const gameTimeInterval = () => {
  gameTimeHandler = setInterval(() => {
    gameTime -= 1
    console.log('gameTime', gameTime)
    if (gameTime <= 0) {
      clearInterval(gameTimeHandler)
      gameTimeHandler = null
    }
    const timeBoard = document.getElementById('timeBoard')
    timeBoard.innerHTML = gameTime.toString()
  }, 1000)
}

const molePopTimeInterval = () => {
  molePopTimeHandler = setInterval(() => {
    if (gameTime <= 0) {
      clearInterval(molePopTimeHandler)
      molePopTimeHandler = null
      onTimeEnd()
    } else {
      let popTime = gameTime > 40 ? 2000 : gameTime > 20 ? 1600 : 1200
      popMoles(popTime)
    }
  }, 3000)
}

export const onPauseGame = () => {
  const pauseButton = document.getElementById('pauseButton')
  if (isPaused) {
    gameTimeInterval()
    molePopTimeInterval()
    pauseButton.innerText = '일시정지'
  } else {
    clearInterval(gameTimeHandler)
    clearInterval(molePopTimeHandler)
    pauseButton.innerText = '재개하기'
  }
  isPaused = !isPaused
}

const onStopGame = () => {
  if (confirm('정말 게임을 그만하시겠습니까?')) {
    clearGame()
    router.navigateTo('/')
  }
}

const onTimeEnd = () => {
  router.navigateTo('/result')
}

export const clearGame = () => {
  clearInterval(gameTimeHandler)
  clearInterval(molePopTimeHandler)
  store.dispatch('GAME_TIME', 60)
  store.dispatch('GAME_SCORE', 0)
}

export const initGame = () => {
  store.dispatch('GAME_TIME', 60)
  store.dispatch('GAME_SCORE', 0)

  let xAxis = store.getters('X_AXIS')
  let yAxis = store.getters('Y_AXIS')
  totalHoles = store.getters('TOTAL_HOLES')
  moleLimit = store.getters('MOLE_LIMIT')
  gameTime = 60
  isPaused = false

  const pauseButton = document.getElementById('pauseButton')
  pauseButton.addEventListener('click', () => {
    onPauseGame()
  }, true)
  const stopButton = document.getElementById('stopButton')
  stopButton.addEventListener('click', () => {
    onStopGame()
  }, true)
  const timeBoard = document.getElementById('timeBoard')
  timeBoard.innerHTML = gameTime.toString()
  const scoreBoard = document.getElementById('scoreBoard')
  scoreBoard.innerHTML = '0'

  if (xAxis < 2 || yAxis < 2 || totalHoles < 4) {
    router.navigateTo('/')
    return
  }

  createMoles(xAxis, yAxis, totalHoles)
  registerMoleEvent()

  gameTimeInterval()
  molePopTimeInterval()
}