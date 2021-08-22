import { examineCombination } from '../models/combinationModel'
import { state } from '../models/state'
import GameView from '../views/game/gameView'

export function submitCombController() {
  if (!GameView.currentMove) return
  const result = examineCombination(GameView.currentMove)
  GameView.renderMoveResult(result.rightCardsInRightPlaces, result.rightCards)
  GameView.startNewMove()
  state.movesPlayed++
}

export function returnCardController() {
  GameView.returnCardToDeck()
}
