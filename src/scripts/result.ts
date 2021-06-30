import store from '../store'
import router from '../router'

/**
 * 게임 재시작 이벤트
 */
const onRestartGame = () => {
  if (confirm('게임을 한번 더 하시겠어요?')) {
    store.dispatch('GAME_TIME', 60)
    store.dispatch('GAME_SCORE', 0)
    router.navigateTo('/game')
  }
}

/**
 * 게임 그만하기 이벤트
 */
const onFinishGame = () => {
  if (confirm('처음 화면으로 갈까요?')) {
    store.dispatch('GAME_TIME', 60)
    store.dispatch('GAME_SCORE', 0)
    router.navigateTo('/')
  }
}

/**
 * /result 페이지 initial 기능 구현부
 */
export const initResult = () => {

  const score = store.getters('GAME_SCORE')

  const scoreBoard = document.getElementById('gameScore')
  scoreBoard.innerHTML = `${score} 점`

  const restartButton = document.getElementById('restartButton')
  restartButton.addEventListener('click', () => {
    onRestartGame()
  }, true)

  const stopButton = document.getElementById('stopButton')
  stopButton.addEventListener('click', () => {
    onFinishGame()
  }, true)
}