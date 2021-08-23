import { examineCombination } from '../models/combinationModel'
import { state } from '../models/state'
import GameView from '../views/game/gameView'

export function submitCombController() {
  if (!GameView.currentMove) return
  const { rightCardsInRightPlaces, rightCards } = examineCombination(
    GameView.currentMove
  )
  GameView.renderMoveResult(rightCardsInRightPlaces, rightCards) /
  GameView.startNewMove()
  state.movesPlayed++
}

export function returnCardController() {
  GameView.returnCardToDeck()
}
