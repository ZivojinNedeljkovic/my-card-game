import { examineCombination } from '../models/combinationModel'
import { state } from '../models/state'
import GameView from '../views/game/gameView'
import * as config from '../models/config'

export function submitCombController() {
  if (!GameView.currentMove) return
  const { rightCardsInRightPlaces, rightCards } = examineCombination(
    GameView.currentMove
  )
  GameView.renderMoveResult(rightCardsInRightPlaces, rightCards) /
    GameView.startNewMove()
  state.movesPlayed++
  if (state.movesPlayed >= config.NUMBER_OF_TRAYS)
    alert(state.winningCombination)
}

export function returnCardController() {
  GameView.returnCardToDeck()
}
