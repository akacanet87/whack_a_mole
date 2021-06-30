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

/**
 * 가로 구멍 수와 세로 구멍 수, 총 구멍 수를 입력 받고 구멍 너비를 구하여 구멍들을 만들어 moleBox 에 붙이기 위한 함수
 * @param xAxis : number      // 가로 구멍 수
 * @param yAxis : number      // 세로 구멍 수
 * @param totalHoles : number // 총 구멍 수
 */
const createMoles = (xAxis: number, yAxis: number, totalHoles: number) => {

  // 구멍 수에 따를 너비와 높이를 각각 구하여 작은 사이즈로 구멍의 너비 높이를 설정
  let width = window.innerWidth > 480 ? 480 / xAxis - 8 : window.innerWidth / xAxis - 8
  let height = (window.innerHeight - 136) / yAxis - 8
  let holeSize = width > height ? height : width
  const moleBox = document.getElementById('moleBox')

  let containerWidth = window.innerWidth > 480 ? 480 : window.innerWidth
  let padding = (containerWidth - ((holeSize + 16) * xAxis)) / 2
  moleBox.innerHTML = ``
  moleBox.style.paddingLeft = `${padding}px`
  moleBox.style.paddingRight = `${padding}px`

  // 각 구멍을 그린다
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

/**
 * 각 두더지에 click 이벤트를 부여하고 보통 두더지와 가짜 두더지에 따른 점수 증감 설정 및 class 를 통한 animation 효과 제어
 */
const registerMoleEvent = () => {
  moleList = document.querySelectorAll('.mole')
  moleList.forEach((mole, index) => {
    mole.addEventListener('click', (e: HTMLElement & MouseEvent) => {
      if (isPaused) {
        return
      }
      let gameScore = store.getters('GAME_SCORE')
      if (mole.className.indexOf('active') >= 0) {
        onHitEffect(e)
        if (mole.className.indexOf('fake') >= 0 && gameScore > 0) {
          gameScore -= 1
        } else {
          gameScore += 1
        }
        onScoreEvent(gameScore)
      }
      const scoreBoard = document.getElementById('scoreBoard')
      scoreBoard.innerHTML = gameScore.toString()
      store.dispatch('GAME_SCORE', gameScore)
      mole.classList.add('hit')
      mole.classList.remove('active')
    }, true)
  })
}

const onHitEffect = (event: MouseEvent) => {
  let x = event.clientX
  let y = event.clientY

  const hitEffect = document.createElement('div')
  hitEffect.style.width = '75px'
  hitEffect.style.height = '51px'
  hitEffect.style.position = 'absolute'
  hitEffect.style.backgroundImage = 'url(./assets/images/hit-effect.png)'
  hitEffect.style.backgroundSize = '100%'
  hitEffect.style.display = 'block'
  hitEffect.style.left = x + 'px'
  hitEffect.style.top = y + 'px'
  hitEffect.style.zIndex = '10'

  const gameSection = document.getElementById('gameSection')

  gameSection.appendChild(hitEffect)

  setTimeout(() => {
    gameSection.removeChild(hitEffect)
  }, 500)
}

const onScoreEvent = (score: number) => {
  const sideText = document.getElementById('sideText')
  sideText.style.display = 'inline-block'
  if (score > 0) {
    sideText.innerHTML = '굿!'
  } else {
    sideText.innerHTML = '땡!'
  }
  setTimeout(() => {
    sideText.style.display = 'none'
  }, 500)
}

/**
 * 해당 함수 호출 시 랜덤 구멍에 두더지를 출현시키며 가짜 두더지도 출현 시킴, 일정 시간 이후 class 제거 하여 사라지게 만듬
 * @param popTime
 */
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

/**
 * 게임 시간 제어 함수, setInterval 함수를 통해 제어하며 잔여 시간이 0초 이하일 경우 handler 제거
 */
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

/**
 * 두더지 출몰 시간 제어 함수, 3초 간격으로 출몰하되, 잔여 게임시간에 따라 나타났다 사라지는 시간은 점점 줄어들도록 설정
 */
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

/**
 * 게임 일시 중지 혹은 재개 함수
 */
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

/**
 * 게임 그만하기 함수
 */
const onStopGame = () => {
  if (confirm('정말 게임을 그만하시겠습니까?')) {
    clearGame()
    router.navigateTo('/')
  }
}

/**
 * 시간 완료 후 결과화면으로 넘어가기 위한 함수
 */
const onTimeEnd = () => {
  router.navigateTo('/result')
}

/**
 * 모든 handler 제거 및 게임 시간, 게임 점수 초기화를 위한 함수
 */
export const clearGame = () => {
  clearInterval(gameTimeHandler)
  clearInterval(molePopTimeHandler)
  store.dispatch('GAME_TIME', 60)
  store.dispatch('GAME_SCORE', 0)
}

/**
 * /game 페이지 initial 기능 구현부
 */
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