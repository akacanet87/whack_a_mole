import store from '../store'
import router from '../router'

/**
 * 시작 버튼 이벤트 등록
 */
const registerStartButton = () => {
  const startButton = document.getElementById('startButton')

  startButton.addEventListener('click', () => {

    const xAxisDom = document.getElementById('xAxis') as HTMLInputElement
    const yAxisDom = document.getElementById('yAxis') as HTMLInputElement
    const moleLimitDom = document.getElementById('moleLimit') as HTMLInputElement

    const xAxis = (xAxisDom.value && parseInt(xAxisDom.value)) || 0
    const yAxis = (yAxisDom.value && parseInt(yAxisDom.value)) || 0
    const moleLimit = (moleLimitDom.value && parseInt(moleLimitDom.value)) || 0

    if (!(xAxis >= 2 && xAxis <= 6)) {
      alert('가로 구멍 수는 2개 이상 6개 이하로 입력해주세요!')
      return
    } else if (!(yAxis >= 2 && yAxis <= 6)) {
      alert('세로 구멍 수는 2개 이상 6개 이하로 입력해주세요!')
      return
    } else if (!(moleLimit >= 1 && moleLimit < xAxis * yAxis / 2)) {
      alert(`출현할 두더지 수는 1개 이상 ${xAxis * yAxis / 2} 미만으로 입력해주세요!`)
      return
    }

    store.dispatch('X_AXIS', xAxis)
    store.dispatch('Y_AXIS', yAxis)
    store.dispatch('TOTAL_HOLES', xAxis * yAxis)
    store.dispatch('MOLE_LIMIT', moleLimit)

    router.navigateTo('/game')
  })
}

/**
 * / 페이지 initial 기능 구현부
 */
export const initHome = () => {

  const xAxisDom = document.getElementById('xAxis') as HTMLInputElement
  const yAxisDom = document.getElementById('yAxis') as HTMLInputElement
  const moleLimitDom = document.getElementById('moleLimit') as HTMLInputElement

  if (store.getters('X_AXIS')) {
    xAxisDom.value = store.getters('X_AXIS').toString()
  }
  if (store.getters('Y_AXIS')) {
    yAxisDom.value = store.getters('Y_AXIS').toString()
  }
  if (store.getters('MOLE_LIMIT')) {
    moleLimitDom.value = store.getters('MOLE_LIMIT').toString()
  }

  registerStartButton()
}