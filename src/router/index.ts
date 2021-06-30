import Router from 'vanilla-router'
import { clearGame } from '../scripts/game'

let router = new Router({
  mode: 'history',
  hooks: {
    before: function (newPage) {
      console.info('Before page loads hook', newPage);
      if (newPage.uri === 'game') {
        clearGame()
      }
    }
  },
  page404: function(path) {
    console.log('"/' + path + '" Page not found')
  },
})

export default router