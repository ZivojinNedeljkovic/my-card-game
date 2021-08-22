//import SwipeAriaView from '../views/swipeAriaView'
import { dealCards } from '../models/cardModel'
import { generateWiningCombination } from '../models/combinationModel'
import * as config from '../models/config'
import { state } from '../models/state'
import GameView from '../views/game/gameView'
import { returnCardController, submitCombController } from './inputController'
;(function () {
  // First cards are dealt, then wining combination is generated accordingly
  dealCards()
  //console.log(state.playersCards)
  generateWiningCombination()
  // console.log(state.winningCombination)

  GameView.render(
    state.playersCards,
    config.NUMBER_OF_TRAYS,
    config.NUMBER_OF_CARDS_PER_TRAY,
    config.CARDS,
    config.MAX_CARDS_OF_TYPE
  )

  GameView.swipeAria.addHandler('up', submitCombController)
  GameView.swipeAria.addHandler('down', returnCardController)
  // const swipeAria = new SwipeAriaView()

  //TableView.render(config.NUMBER_OF_TRAYS, config.NUMBER_OF_CARDS_PER_TRAY)
  // PlayersDeckView.render(config.CARDS, state.playersCards)

  //PlayersDeckView.onClickHandler(addCardToTable)
  //SwipeAriaView.addHandler('up', submitCombController)
})()
