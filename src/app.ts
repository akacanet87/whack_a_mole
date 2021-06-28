import Router from 'vanilla-router'
import Home from './views/Home'
import Game from './views/Game'
import Result from './views/Result'
import { initGame } from './scripts/game'

//App area
const App = document.getElementById('root')

let router = new Router({
  mode: 'history',
  hooks: {
    before: function (newPage) {
      console.info('Before page loads hook', newPage);
    }
  },
  page404: function(path) {
    console.log('"/' + path + '" Page not found')
  },
})

router.add('', function() {
  console.log('Home page-----------------------')
  App.innerHTML = Home
})
.add('game', function() {
  console.log('Game page-----------------------')
  App.innerHTML = Game
  initGame()
})
.add('result', function() {
  console.log('Result page-----------------------')
  App.innerHTML = Result
})

router.addUriListener()
.check()