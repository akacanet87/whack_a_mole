import router from './router'
import Home from './views/Home'
import Game from './views/Game'
import Result from './views/Result'
import { initHome } from './scripts/home'
import { initGame } from './scripts/game'
import { initResult } from './scripts/result'

const RootDom = document.getElementById('root')

router.add('', function() {
  console.log('Home page-----------------------')
  RootDom.innerHTML = Home
  initHome()
})
.add('game', function() {
  console.log('Game page-----------------------')
  RootDom.innerHTML = Game
  initGame()
})
.add('result', function() {
  console.log('Result page-----------------------')
  RootDom.innerHTML = Result
  initResult()
})

router.addUriListener()
.check()