'user string'

import { START_GAME } from '../actionTypes'

module.exports = {
  startGame(game) {
    return {
      type: START_GAME,
      payload: game
    }
  }
}
